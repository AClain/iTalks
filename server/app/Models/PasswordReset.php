<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory;

    protected $table = "password_resets";

    protected $fillable = ['user_id', 'token', 'expiration_date'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}