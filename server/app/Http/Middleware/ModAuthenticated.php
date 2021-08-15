<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\TokenController;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;

class ModAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $token = $request->cookie('token');
        $claims = TokenController::parseToken($token);
        $user = User::where('username', $claims['username'])->first();

        // Use is admin ?
        if ($user->role != "admin") {
            // Use is mod ?
            if ($user->role != "modérateur") {
                return $this->forbiddenCookie('Vous n\'avez pas les autorisations nécessaires pour accèder à ce contenu.');
            }
        }

        return $next($request);
    }

    /**
     * Undocumented function
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    private function forbiddenCookie(string $message)
    {
        return response()->json([
            'message' => $message,
            'status' => 403
        ], 403);
    }
}
