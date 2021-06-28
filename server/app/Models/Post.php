<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = "posts";
    protected $fillable = ['title', 'text', 'is_edited', 'user_id', 'status_id'];
    protected $appends = ['status', 'user', 'comments_count', 'associated_resources'];
    protected $hidden = ['user_id', 'status_id', 'comments', 'resources'];

    // Relationship methods
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->hasMany(PostSaved::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function resources()
    {
        return $this->belongsToMany(Resource::class, 'post_resources')->withTimestamps();
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    // Accessor methods

    public function getStatusAttribute()
    {
        return Status::find($this->status_id)->name;
    }

    public function getUserAttribute()
    {
        $user = User::find($this->user_id);
        return [
            'id' => $user->id,
            'username' => $user->username,
        ];
    }

    public function getCommentsCountAttribute()
    {
        return $this->comments->count();
    }

    public function getAssociatedResourcesAttribute()
    {
        return $this->resources;
    }
}