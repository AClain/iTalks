<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use Lcobucci\JWT\Configuration;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Signer\Key\InMemory;

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
            InMemory::base64Encoded(env('JWT_SECRET'))
        );

        return $configuration;
    }

    /**
     * Returns a valid JWT
     *
     * @param User $user
     * @return \Lcobucci\JWT\Token\Plain
     */
    public static function generateToken($user)
    {
        $config = self::getConfig();

        $now   = new DateTimeImmutable();
        $token = $config->builder()
            ->issuedBy(env('APP_URL'))
            ->permittedFor(env('FRONT_URL'))
            // ->identifiedBy('4f1g23a12aa')
            ->issuedAt($now)
            // ->expiresAt($now->modify('+1 hour'))
            ->withClaim('uid', $user->id)
            ->withClaim('username', $user->username)
            ->withClaim('role', $user->role->name)
            ->withClaim('status', $user->status->name)
            // ->withHeader('foo', 'bar')
            ->getToken($config->signer(), $config->signingKey());

        return $token;
    }
}