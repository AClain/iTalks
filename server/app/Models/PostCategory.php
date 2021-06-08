<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    protected $table = "posts_resources";

    protected $fillable = ['post_id', 'category_id', 'status_id'];

    public function post()
    {
        return $this->hasOne(Post::class, 'id', 'post_id');
    }

    public function resource()
    {
        return $this->hasMany(Category::class, 'id', 'category_id');
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }
}