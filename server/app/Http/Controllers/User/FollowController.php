<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\TokenController;

use Illuminate\Http\Request;

use App\Models\Follow;
use App\Models\User;

class FollowController extends Controller
{
    public function getFollowers(Request $request, int $user_id)
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'L\'utilisateur n\'a pas été trouvé.',
            ], 404);
        }

        $followers = $user->followers->append('follower')->toArray();

        return response()->json([
            'followers' => $followers
        ]);
    }

    public function getFollowings(Request $request, int $user_id)
    {
        $user = User::find($user_id);

        if (!$user) {
            return response()->json([
                'message' => 'L\'utilisateur n\'a pas été trouvé.',
            ], 404);
        }

        $followings = $user->followings->append('following')->toArray();

        return response()->json([
            'followings' => $followings
        ]);
    }

    public function follow(Request $request, $following_id)
    {
        $token = TokenController::parseToken($request->cookie('token'));
        $following = User::findOrFail($following_id);

        $follow = Follow::where('follower_id', $token["uid"])->where('following_id', $following_id)->first();

        if ($follow) {
            return response()->json([
                'message' => 'Vous suivez déjà ' . $following->username . '.',
            ], 400);
        }

        $follow = new Follow();

        $follow->follower_id = $token["uid"];
        $follow->following_id = $following_id;
        $follow->has_notifications = $request->query('has_notifications') ? 1 : 0;

        if ($follow->save()) {
            return response()->json([
                'message' => 'Vous suivez maintenant ' . $following->username . '.',
            ], 400);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    public function unfollow(Request $request, $following_id)
    {
        $token = TokenController::parseToken($request->cookie('token'));
        $following = User::findOrFail($following_id);

        $follow = Follow::where('follower_id', $token["uid"])->where('following_id', $following_id);

        if (!$follow) {
            return response()->json([
                'message' => 'Vous ne suivez pas ' . $following->username . '.',
            ], 400);
        }

        if ($follow->destroy()) {
            return response()->json([
                'message' => 'Vous ne suivez plus ' . $following->username . '.',
            ], 400);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}
