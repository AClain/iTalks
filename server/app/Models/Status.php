<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
    use HasFactory;

    protected $table = 'statuses';

    protected $fillable = ['name'];

    public function badges()
    {
        return $this->hasMany(Badge::class);
    }

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function post_categories()
    {
        return $this->hasMany(PostCategory::class);
    }

    public function post_resources()
    {
        return $this->hasMany(PostResource::class);
    }

    public function post_saved()
    {
        return $this->hasMany(PostSaved::class);
    }

    public function resources()
    {
        return $this->hasMany(Resource::class);
    }

    public function roles()
    {
        return $this->hasMany(Role::class);
    }

    public function users()
    {
        return $this->hasMany(User::class);
    }

    public function user_badges()
    {
        return $this->hasMany(UserBadge::class);
    }
}