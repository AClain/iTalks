<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostResource extends Model
{
    protected $table = "posts_resources";

    protected $fillable = ['post_id', 'resource_id', 'status_id'];

    public function post()
    {
        return $this->hasOne(Post::class, 'id', 'post_id');
    }

    public function resource()
    {
        return $this->hasMany(Resource::class, 'id', 'resource_id');
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }
}