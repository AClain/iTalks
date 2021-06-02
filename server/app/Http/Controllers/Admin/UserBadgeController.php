<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Status;
use App\Models\Badge;
use App\Models\UserBadge;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserBadgeController extends Controller
{
    public function store($user_id, Request $request)
    {

        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'L\'utilisateur n\'a pas été trouvé.',
            ], 404);
        }

        $badgesArray = $request->all();

        foreach ($badgesArray["badges"] as $key => $value) {

            $badges = Badge::where('name', $value["name"])->first();
            $status = Status::where('name', $value["status"])->first();

            if (empty($value["name"])) {
                return response()->json([
                    'errors' => [
                        'badges' => 'Le champ badges est requis.'
                    ]
                ], 400);
            } else if (empty($value["status"])) {
                return response()->json([
                    'errors' => [
                        'statut' => 'Le champ statut est requis.'
                    ]
                ], 400);
            } else if ($badges === null) {
                return response()->json([
                    'errors' => [
                        'badges' => 'Un badge n\'existe pas.'
                    ]
                ], 400);
            }else if ($status === null) {
                return response()->json([
                    'errors' => [
                        'status' => 'Un status n\'existe pas.'
                    ]
                ], 400);
            }

            $isExistBadgeLinkUser = UserBadge::where('user_id', $user_id)
                ->where('badge_id', $badges->id)->first();

            if ($user_id !== $user->id && $isExistBadgeLinkUser) {
                return response()->json([
                    'errors' => [
                        'username' => 'L\'utilisateur est déjà lié à un badge.'
                    ]
                ], 400);
            } else if ($user_id !== $user->id && $user->id === null) {
                return response()->json([
                    'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
                ], 500);
            }

            $UserBadge = new UserBadge();

            $UserBadge->user_id = $user->id;
            $UserBadge->badge_id = $badges->id;
            $UserBadge->status_id = $status->id;
            $save = $UserBadge->save();

            if ($save) {
                return response()->json([
                    'message' => 'Utilisateur est lié aux badges.'
                ], 201);
            } else {
                return response()->json([
                    'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
                ], 500);
            }

        }
    }
}
