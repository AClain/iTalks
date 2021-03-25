<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "users";

    protected $fillable = ['username, email, password, role_id, avatar_resource_id, status_id'];

    public function role()
    {
        $this->hasOne(Role::class);
    }

    public function status()
    {
        $this->hasOne(Status::class);
    }
}