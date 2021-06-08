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

        $this->validate($request, [
            "badges" => "required|array"
        ]);

        $user = User::where('id', $user_id)->first();

        return response()->json([
            'message' => 'Impossible de lier un badge à cet utilisateur.'
        ], 404);

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
        }

        return response()->json([
            'message' => 'Les badges ont bien été liés à l\'utilisateur'
        ], 201);
    }
}