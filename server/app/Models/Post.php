<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = "posts";

    protected $fillable = ['title', 'text', 'user_id', 'status_id', 'is_edited'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }

    public function resources()
    {
        return $this->hasMany(PostResource::class, 'post_id', 'id');
    }

    public function categories()
    {
        return $this->hasMany(PostCategory::class, 'post_id', 'id');
    }
}