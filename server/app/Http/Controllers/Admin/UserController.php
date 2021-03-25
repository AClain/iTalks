<?php

namespace App\Http\Controllers\Admin;

use Exception;

use App\Models\Resource;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|min:3|max:25|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|exists:roles,name',
            'status' => 'required|exists:statuses,name',
            'password' => 'required|min:3|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($request->hasFile('avatar')) {
            $file_extention = $request->file('avatar')->getClientOriginalExtension();
            if (!in_array($file_extention, ['jpeg', 'jpg', 'png', 'gif'])) {
                return response()->json([
                    'errors' => [
                        'avatar' => 'L\'extension du fichier n\'est pas accepté. (' . $file_extention . ')'
                    ]
                ], 400);
            }
        }

        $role = Role::where('name', request('role'))->first();
        $status = Status::where('name', request('status'))->first();

        $user = new User();
        $user->username = trim(request('username'));
        $user->email = strtolower(request('email'));
        $user->role_id = $role->id;
        $user->status_id = $status->id;
        $user->password = Hash::make(request('password'));
        $save = $user->save();

        if ($save) {
            if ($request->hasFile('avatar')) {
                $this->storeAvatar($request->file('avatar'), $user);
            }

            return response()->json([
                'message' => 'Utilisateur enregistré avec succès!'
            ], 201);
        } else {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }

    public function list()
    {
        // Pagination
        $users = User::all();

        foreach ($users as $user) {
            $user->role = Role::find($user->role_id);
            $user->status = Status::find($user->status_id);
            $user->avatar = Resource::find($user->avatar_resource_id);

            unset($user->role_id);
            unset($user->status_id);
            unset($user->avatar_resource_id);
        }

        return response()->json([
            'users' => $users,
        ], 201);
    }

    public function update($username, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'min:3|max:25',
            'email' => 'email',
            'role' => 'exists:roles,name',
            'status' => 'exists:statuses,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('username', $username)->first();

        $customExistsUsername = User::where('username', request('username'))->first();
        $customExistsEmail = User::where('email', request('email'))->first();

        if (request('username') !== $user->username && $customExistsUsername) {
            return response()->json([
                'errors' => [
                    'username' => 'La valeur du champ nom d\'utilisateur est déjà utilisée.'
                ]
            ], 400);
        } else if (request('email') !== $user->email && $customExistsEmail) {
            return response()->json([
                'errors' => [
                    'email' => 'La valeur du champ adresse email est déjà utilisée.'
                ]
            ], 400);
        }

        $role = Role::where('name', request('role'))->first();
        $status = Status::where('name', request('status'))->first();

        $user->username = request('username') ? request('username') : $user->username;
        $user->email = request('email') ? request('email') : $user->email;
        $user->role_id = $role ? $role->id : $user->role_id;
        $user->status_id = $status ? $status->id : $user->status_id;
        $user->password = request('password') ? Hash::make(request('password')) : $user->password;
        $update = $user->save();

        if ($update) {
            $user->role = Role::find($user->role_id);
            $user->status = Status::find($user->status_id);
            $user->avatar = Resource::find($user->avatar_resource_id);

            unset($user->role_id);
            unset($user->status_id);
            unset($user->avatar_resource_id);

            return response()->json([
                'message' => 'Utilisateur mis à jour avec succès!',
                'user' => $user
            ], 201);
        } else {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }

    public function get(Request $request, $username)
    {
        $user = User::where('username', $username)->first();

        if ($user) {
            $user->role = Role::find($user->role_id);
            $user->status = Status::find($user->status_id);
            $user->avatar = Resource::find($user->avatar_resource_id);

            unset($user->role_id);
            unset($user->status_id);
            unset($user->avatar_resource_id);

            return response()->json([
                'user' => $user,
            ], 201);
        }
    }

    public function getByUsername(Request $request, $username)
    {
        $user = User::where('username', $username)->first();

        if ($user) {
            $user->role = Role::find($user->role_id);
            $user->status = Status::find($user->status_id);
            $user->avatar = Resource::find($user->avatar_resource_id);

            unset($user->role_id);
            unset($user->status_id);
            unset($user->avatar_resource_id);

            return response()->json([
                'user' => $user,
            ], 201);
        }

        return response()->json([
            'message' => "Utilisateur non trouvé.",
        ], 404);
    }

    public function delete($username)
    {
        $user = User::where('username', $username)->first();

        $avatar_delete = $this->deleteAvatarInner($user);

        if (!$avatar_delete) {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }

        $delete = $user->delete();

        if ($delete) {
            return response()->json([
                'message' => 'Utilisateur supprimé avec succès!'
            ], 201);
        } else {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }

    private function storeAvatar($file, $user)
    {
        $file_extention = $file->getClientOriginalExtension();
        $filename = 'avatar.' . $file_extention;
        $user =  User::find($user->id);

        $base_path = public_path('/storage/images/users/');

        $user_path = $base_path . $user->id;

        if (!File::isDirectory($user_path)) {
            File::makeDirectory($user_path, 0777, true, true);
        }

        $file->storeAs('users/' . $user->id, 'avatar.' . $file_extention, 'local');

        $avatar = new Resource();
        $avatar->link = 'http://localhost:18080/api/image/' . $user->id . '/' . $filename;
        $avatar->name = $filename;
        $avatar->status_id = 1;
        $avatar->save();

        $user->avatar_resource_id = $avatar->id;
        $user->save();
    }

    public function updateAvatar(Request $request, $username)
    {
        $user = User::where('username', $username)->first();

        if ($user && $request->hasFile('avatar')) {
            $file_extention = $request->file('avatar')->getClientOriginalExtension();
            if (!in_array($file_extention, ['jpeg', 'jpg', 'png', 'gif'])) {
                return response()->json([
                    'errors' => [
                        'avatar' => 'L\'extension du fichier n\'est pas accepté. (' . $file_extention . ')'
                    ]
                ], 400);
            }

            $avatar_delete = $this->deleteAvatarInner($user);

            if (!$avatar_delete) {
                return response()->json([
                    'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
                ], 500);
            }

            $this->storeAvatar($request->file('avatar'), $user);

            return response()->json([
                'message' => 'L\'avatar a été modifié avec succès!',
                'user' => $user
            ], 201);
        }

        return response()->json([
            'message' => '500: Erreur serveur. Impossible de mettre à jour la resource.'
        ], 500);
    }

    public function deleteAvatarOuter($username)
    {
        $user = User::where('username', $username)->first();
        $user_avatar_resource = Resource::find($user->avatar_resource_id);

        if (File::exists(public_path('/storage/images/users/' . $user->id . '/' . $user_avatar_resource->name)) && $user_avatar_resource) {
            File::delete(public_path('/storage/images/users/' . $user->id . '/' . $user_avatar_resource->name));
            $delete = $user_avatar_resource->delete();

            if (!$delete) {
                return response()->json([
                    'message' => '500: Erreur serveur. Impossible de supprimer la resource (introuvable ou inexistante).'
                ], 500);
            }

            $user->avatar_resource_id = null;
            $user->save();

            return response()->json([
                'message' => 'L\'image de l\'utilisateur a été supprimée avec succés!'
            ], 201);
        } else if (stripos($user_avatar_resource->link, 'placeholder')) {
            $user->avatar_resource_id = null;
            $user->save();

            return response()->json([
                'message' => 'L\'image de l\'utilisateur a été supprimée avec succés!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Erreur serveur. Impossible de supprimer la resource (introuvable ou inexistante).'
        ], 500);
    }

    private function deleteAvatarInner($user)
    {
        $user_avatar_resource = Resource::where('id', $user->avatar_resource_id)->first();

        if ($user_avatar_resource && File::exists(public_path('/storage/images/users/' . $user->id . '/' . $user_avatar_resource->name))) {
            File::delete(public_path('/storage/images/users/' . $user->id . '/' . $user_avatar_resource->name));
            return $user_avatar_resource->delete();
        }

        return true;
    }
}