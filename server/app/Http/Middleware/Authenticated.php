<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\TokenController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use Closure;
use Carbon\Carbon;
use DateTimeImmutable;

use App\Models\User;

class Authenticated
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
        // Cookie exists
        $token = $request->header('Authorization');
        if (!$token || !TokenController::verifyToken($token)) {
            return $this->unauthorizedCookie('Vous devez être connecté pour effectuer cette action.');
        };

        // Cookie is from server and is valid for client
        $claims = TokenController::parseToken($token);
        if ($claims['iss'] !== config('app.url') . config('app.port') || $claims['aud'][0] !== config('app.client_url')) {
            return $this->unauthorizedCookie('Vous devez être connecté pour effectuer cette action.');
        }

        $user = User::where('username', $claims['username'])->first();

        if (!isset($user)) {
            return $this->unauthorizedCookie('Vous devez être connecté pour effectuer cette action.');
        }

        // Cookie hasn't expired
        $now = Carbon::parse(new DateTimeImmutable());
        $expAt = Carbon::parse($claims['exp']);
        if ($expAt->isBefore($now) && !$claims['remember_me']) {
            return $this->unauthorizedCookie('La session a expirée.');
        }

        // User account active ?
        if ($user->status === "supprimé") {
            return $this->unauthorizedCookie('Ce compte a été suspendu.');
        }

        $response = $next($request);

        if (isset($response->original["no-cookie"])) {
            return $response;
        }

        // Update token
        if (!$claims['remember_me']) {
            $token = TokenController::generateToken($user, false);
            return $response->header('Authorization', 'Bearer' . $token);
        }
        return $response->header('Authorization', 'Bearer' . $token);
    }

    /**
     * Undocumented function
     *
     * @param string $message
     * @return \Illuminate\Http\JsonResponse
     */
    private function unauthorizedCookie(string $message)
    {
        return response()->json([
            'message' => $message,
            'status' => 401
        ], 401);
    }
}