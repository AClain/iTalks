<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostSaved extends Model
{
    protected $table = "posts_saved";

    protected $fillable = ['user_id', 'post_id', 'status_id'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }

    public function post()
    {
        return $this->hasOne(Post::class, 'id', 'post_id');
    }

}
