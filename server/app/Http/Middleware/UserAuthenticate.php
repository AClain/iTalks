<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\TokenController;
use Closure;
use Illuminate\Http\Request;

class UserAuthenticate
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('token');

        if (!$token) {
            abort(403);
        };

        return response()->json([
            'claims' => TokenController::verifyToken($token)
        ]);

        return $next($request);
    }
}
