<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "users";

    protected $fillable = ['username', 'email', 'password', 'role_id', 'avatar_resource_id', 'status_id'];

    public function password_reset()
    {
        return $this->hasOne(PasswordReset::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function badges()
    {
        return $this->belongsToMany(Badge::class);
    }

    public function followers()
    {
        return $this->hasMany(Follow::class, 'follower_id', 'id');
    }

    public function follows()
    {
        return $this->hasMany(Follow::class, 'following_id', 'id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
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
        return $this->hasMany(Message::class, 'sender_id', 'id');
    }

    public function reports()
    {
        return $this->hasMany(Report::class, 'reporter_id', 'id');
    }

    public function reported_by()
    {
        return $this->hasMany(Report::class, 'reported_id', 'id');
    }
}
