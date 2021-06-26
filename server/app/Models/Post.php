<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = "posts";
    protected $fillable = ['title', 'text', 'is_edited', 'user_id', 'status_id'];
    protected $appends = ['status', 'user'];
    protected $hidden = ['user_id', 'status_id'];

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
        return $this->hasMany(Resource::class);
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
            'name' => $user->name,
        ];
    }
}
