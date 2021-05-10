<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\TokenController;

use Illuminate\Http\Request;

use App\Models\User;

use Closure;


class AdminAuthenticated
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
        $claims = TokenController::parseToken($token);
        $user = User::where('username', $claims['username'])->first();

        // Use is admin ?
        if ($user->role() === "admin") {
            return $this->forbiddenCookie('Vous devez être administrateur pour accèder à ce contenu.');
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