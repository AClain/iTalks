<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\SearchController;
use App\Http\Controllers\SearchOptionsController;
use App\Models\Post;
use Illuminate\Http\Request;

use Illuminate\Support\Carbon;

use App\Models\User;


class UserController extends Controller
{
    public function feed(Request $request)
    {
        $posts = Post::all();

        return response()->json([
            'posts' => $posts
        ]);
    }

    public function profil(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));

        $user = User::find($token['uid'])->load('badges', 'role', 'avatar', 'status');

        return response()->json([
            'info' => $user
        ]);
    }

    public function profilPosts(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));

        $user = User::find($token['uid']);

        return response()->json([
            'posts' => $user->posts
        ]);
    }

    public function profilComments(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));

        $user = User::find($token['uid']);

        return response()->json([
            'comments' => $user->comments
        ]);
    }

    public function list(Request $request)
    {
        $users = new SearchController($request, User::query());
        $users = $users->addWhere('username', 'LIKE', '%' . $users->getSearch() . '%');

        return true;

        // return new ResponseController::toJson($users->getResults());
    }

    public function verifyEmail(Request $request, string $token)
    {
        $token = TokenController::parseToken($token);

        $now = Carbon::parse(new \DateTimeImmutable());
        $expAt = Carbon::parse($token['exp']);
        if ($expAt->isBefore($now)) {
            return response()->json([
                'message' => 'Ce lien a expiré.'
            ], 404);
        }

        $user = User::find($token['uid']);

        $user->email_verified = true;
        $user->email_token = null;

        if ($user->save()) {
            return response()->json([
                'message' => 'Votre adresse mail a bien été confirmée!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}