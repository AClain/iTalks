<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function home()
    {
        return response()->json([
            'message' => 'HOME'
        ]);
    }
}