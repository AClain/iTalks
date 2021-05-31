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
            "badge" => 'required|exists:badges,name',
            'status' => 'required|exists:statuses,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('id', $user_id)->first();

        $badge = Badge::where('name', request('badge'))->first();
        $status = Status::where('name', request('status'))->first();

        $UserBadge = new UserBadge();
        $UserBadge->user_id = $user->id;
        $UserBadge->badge_id = $badge->id;
        $UserBadge->status_id = $status->id;
        $save = $UserBadge->save();

        if ($save) {
            return response()->json([
                'message' => 'Utilisateur est lié au badge'
            ], 201);
        } else {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }
}