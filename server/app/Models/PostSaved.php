<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostSaved extends Model
{
    protected $table = "posts_saved";
    protected $fillable = ['user_id', 'post_id', 'status_id'];
    protected $hidden = ['user_id', 'post_id', 'status_id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function post()
    {
        return $this->belongsTo(Post::class);
    }
    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}