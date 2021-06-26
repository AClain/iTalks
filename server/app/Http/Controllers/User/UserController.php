<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use App\Http\Controllers\SearchOptionsController;
use App\Models\Status;
use App\Models\User;
use App\Models\Resource;
use App\Models\Role;

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
}