<?php

namespace App\Http\Controllers;

class ResponseController extends Controller
{
    static function toJson($payload, int $status = 200)
    {
        return response()->json($payload, $status);
    }
}