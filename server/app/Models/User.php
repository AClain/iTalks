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

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function badges()
    {
        return $this->hasMany(UserBadge::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function saved_posts()
    {
        return $this->hasMany(PostSaved::class);
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}