<?php

namespace App\Http\Controllers;

class ResponseController extends Controller
{
    static function JSON($payload, int $status)
    {
        return response()->json($payload, $status);
    }
}