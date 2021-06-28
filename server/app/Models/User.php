<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = "users";
    protected $fillable = ['username', 'email', 'password', 'email_verified', 'email_token', 'role_id', 'resource_id', 'status_id'];
    protected $appends = ['role', 'avatar', 'status'];
    protected $hidden = ['password', 'email_token', 'role_id', 'resource_id', 'status_id'];

    // Relationship methods

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
        return $this->belongsToMany(Badge::class, 'user_badges')->withTimestamps();
    }

    public function followings()
    {
        return $this->hasMany(Follow::class, 'follower_id', 'id');
    }

    public function followers()
    {
        return $this->hasMany(Follow::class, 'following_id', 'id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function avatar()
    {
        return $this->hasOne(Resource::class);
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

    // Accesor methods

    public function getRoleAttribute()
    {
        return Role::find($this->role_id)->name;
    }

    public function getAvatarAttribute()
    {
        return Resource::find($this->resource_id)->link;
    }

    public function getStatusAttribute()
    {
        return Status::find($this->status_id)->name;
    }

    // Custom methods

    public function isAdmin()
    {
        return $this->role->name === "admin";
    }

    public function isDev()
    {
        return $this->role->name === "developpeur";
    }

    public function isMod()
    {
        return $this->role->name === "modérateur";
    }

    public function isCompany()
    {
        return $this->role->name === "entreprise";
    }

    public function isBasic()
    {
        return $this->role->name === "utilisateur";
    }
}
