<?php

namespace App\Http\Middleware;

use App\Http\Controllers\Auth\TokenController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

use Closure;
use Carbon\Carbon;
use DateTimeImmutable;

use App\Models\User;

class AdminAuthenticate
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
        $token = $request->cookie('token');
        if (!$token || !TokenController::verifyToken($token)) {
            return $this->forgetCookie('Invalid session.');
        };

        // Cookie is from server and is valid for client
        $claims = TokenController::parseToken($token);
        if ($claims['iss'] !== config('app.url') || $claims['aud'][0] !== config('app.client_url')) {
            return $this->forgetCookie('Invalid session.');
        }


        return response()->json([
            'claims' => $claims
        ]);

        // Cookie hasn't expired
        $now = Carbon::now();
        $expAt = Carbon::parse($claims['exp']);
        if ($expAt->isAfter($now)) {
            return $this->forgetCookie('Session expires.');
        }

        // Date -2Hr ?
        return response()->json([
            'claims' => $claims
        ]);

        $response = $next($request);

        $config = TokenController::getConfig();
        $user = User::where('username', $claims['useranem'])->first();

        $now   = new DateTimeImmutable();
        $token = $config->builder()
            ->issuedBy(config('app.url'))
            ->permittedFor(config('app.client_url'))
            ->issuedAt($now)
            ->expiresAt($now->modify('+10 minutes'))
            ->withClaim('uid', $user->id)
            ->withClaim('username', $user->username)
            ->withClaim('role', $user->role->name)
            ->withClaim('status', $user->status->name)
            ->getToken($config->signer(), $config->signingKey());

        return $response->cookie('token', $token->toString(), null, null, null, null, true);
    }

    private function forgetCookie(string $message)
    {
        Cookie::queue(Cookie::forget('token'));
        $cookie = Cookie::make('token', '');
        return response()->json([
            'message' => $message,
            'status' => 403
        ], 403)->withCookie($cookie);
    }
}