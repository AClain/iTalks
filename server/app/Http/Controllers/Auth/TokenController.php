<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;
use Lcobucci\JWT\UnencryptedToken;

use DateTimeImmutable;

class TokenController extends Controller
{
    /**
     * Returns a valid \Lcobucci\JWT\Configuration object
     *
     * @return \Lcobucci\JWT\Configuration
     */
    public static function getConfig()
    {
        $configuration = Configuration::forSymmetricSigner(
            new Sha256(),
            InMemory::base64Encoded(config('token.jwt.secret'))
        );

        return $configuration;
    }

    /**
     * Returns a valid JWT
     *
     * @param User $user
     * @return \Lcobucci\JWT\Token\Plain
     */
    public static function generateToken($user, $remember_me)
    {
        $config = self::getConfig();

        $now = new DateTimeImmutable();
        $token = $config->builder()
            ->issuedBy(config('app.url'))
            ->permittedFor(config('app.client_url'))
            // ->identifiedBy('4f1g23a12aa')
            ->issuedAt($now)
            ->expiresAt($now->modify('+10 minutes'))
            ->withClaim('uid', $user->id)
            ->withClaim('username', $user->username)
            ->withClaim('role', $user->role->name)
            ->withClaim('status', $user->status->name)
            ->withClaim('remember_me', $remember_me ? true : false)
            // ->withHeader('foo', 'bar')
            ->getToken($config->signer(), $config->signingKey());

        return $token;
    }

    /**
     * Verify a token validity
     *
     * @param string $token
     * @return boolean
     */
    public static function verifyToken(string $token)
    {
        $config = self::getConfig();

        $token = $config->parser()->parse($token);

        return assert($token instanceof UnencryptedToken);
    }

    /**
     * Parse and returns a token content
     *
     * @param string $token
     * @return mixed
     */
    public static function parseToken(string $token)
    {
        $config = self::getConfig();

        $token = $config->parser()->parse($token);

        assert($token instanceof UnencryptedToken);

        return $token->claims()->all();
    }

    public function authenticated()
    {
        return response()->json([
            'status' => 201
        ], 201);
    }

    public function unauthenticated()
    {
        return response()->json([
            'status' => 201
        ], 201);
    }
}