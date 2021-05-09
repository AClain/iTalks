<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Models\Role;
use App\Models\User;
use App\Models\Status;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Auth\TokenController;

class UserAuthController extends Controller
{
    /**
     * Registers and login the user. Returns a JWT token for authorized requests
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|min:3|max:25|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $role = Role::where('name', 'utilisateur')->first();
        $status = Status::where('name', 'actif')->first();

        $user = new User();
        $user->username = trim(request('username'));
        $user->email = strtolower(request('email'));
        $user->role_id = $role->id;
        $user->status_id = $status->id;
        $user->password = Hash::make(request('password'));
        $save = $user->save();

        if ($save) {
            $token = TokenController::generateToken($user, null);

            return response()->json([
                'message' => 'Inscription effectuée avec succès!',
            ], 201)->cookie('token', $token->toString(), null, null, null, null, true);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Login the user. Returns a JWT token for authorized requests
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validatorFirst = Validator::make($request->all(), [
            'type' => ['required', 'regex:/(^username$)|(^email$)/'],
            'identifier' => 'required',
            'password' => 'required'
        ], [
            'type.regex' => 'Le type d\'identification doit être "email" ou "username".'
        ]);

        if ($validatorFirst->fails()) {
            return response()->json([
                'errors' => $validatorFirst->errors()
            ], 400);
        }

        $validatorSecond = null;

        if (request('type') === 'username') {
            $validatorSecond = Validator::make($request->all(), [
                'identifier' => 'exists:users,username',
            ]);
        } else if (request('type') === 'email') {
            $validatorSecond = Validator::make($request->all(), [
                'identifier' => 'exists:users,email',
            ]);
        }

        if ($validatorSecond->fails()) {
            return response()->json([
                'errors' => $validatorSecond->errors()
            ], 400);
        }

        $user = User::where(request('type'), request('identifier'))->first();

        if (Hash::check(request('password'), $user->password)) {
            $token = TokenController::generateToken($user, request('remember_me'));

            return response()->json([
                'message' => 'Connexion effectuée avec succès!',
            ], 201)->cookie('token', $token->toString(), null, null, null, null, true);
        }

        return response()->json([
            'message' => 'Votre mot de passe ne correspond pas.'
        ], 400);
    }
}