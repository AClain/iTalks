<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\SearchOptionsController;

use Illuminate\Http\Request;

use Illuminate\Support\Carbon;

use App\Models\User;


class UserController extends Controller
{
    public function list(Request $request)
    {
        $searchOptions = new SearchOptionsController($request);
        $users = User::where('username', 'LIKE', '%' . $searchOptions->getSearch() . '%')->limit($searchOptions->getLimit())->offset($searchOptions->getOffset())->get();

        return response()->json([
            'users' => $users,
        ], 201);
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