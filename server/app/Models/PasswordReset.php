<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PasswordReset extends Model
{
    use HasFactory;

    protected $table = "password_resets";
    protected $fillable = ['user_id', 'token', 'expiration_date'];
    protected $hidden = ['user_id'];
}