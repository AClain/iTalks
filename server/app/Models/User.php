<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "users";

    protected $fillable = ['username', 'email', 'password', 'role_id', 'avatar_resource_id', 'status_id'];

    public function role()
    {
        return $this->hasOne(Role::class, 'id', 'role_id');
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }

    public function avatar()
    {
        return $this->hasOne(Resource::class, 'id', 'avatar_resource_id');
    }
}