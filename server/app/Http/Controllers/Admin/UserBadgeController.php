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

        $validator = Validator::make($request->all(), [
            "badges" => "required|array"
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Mauvais format de données.'
            ], 400);
        }

        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'Impossible de lier un badge à cet utilisateur.'
            ], 404);
        }

        $errors = [];

        foreach (request('badges') as $badge) {
            $validator = Validator::make($badge, [
                "badge" => 'required|exists:badges,name',
                'status' => 'required|exists:statuses,name'
            ]);

            if ($validator->fails()) {
                $errors[] = $validator->errors();
                continue;
            }

            $badge = Badge::where('name', $badge->badge)->first();
            $status = Status::where('name', $badge->status)->first();

            $badgeAlreadyLinked = UserBadge::where('user_id', $user_id)
                ->where('badge_id', $badge->id)->first();

            if ($badgeAlreadyLinked) {
                $errors[] = 'Le badge "' + $badge->name + '" est déjà relié à l\'utilisateur';
            }

            if (!$badge) {
                return response()->json([
                    'message' => 'Le badge "' + $badge->badge + '" n\'existe pas'
                ], 404);
            } else if (!$status) {
                return response()->json([
                    'message' => 'Le statut "' + $badge->status + '" n\'existe pas'
                ], 404);
            }

            $userBadge = new UserBadge();
            $userBadge->user_id = $user->id;
            $userBadge->badge_id = $badge->id;
            $userBadge->status_id = $status->id;
            $save = $userBadge->save();

            if (!$save) {
                $errors[] = 'Une erreur s\'est produite, le badge "' + $badge->badge + '" n\'a pas pu être lié, veuillez réessayer.';
            }

            if (!$user) {
                return response()->json([
                    'message' => 'L\'utilisateur n\'a pas été trouvé.',
                ], 404);
            }
        }

        if (!empty($errors)) {
            return response()->json([
                'message' => 'Des erreurs sont survenues.',
                'errors' => $errors
            ], 400);
        }

        return response()->json([
            'message' => 'Les badges ont bien été liés à l\'utilisateur'
        ], 201);
    }
}