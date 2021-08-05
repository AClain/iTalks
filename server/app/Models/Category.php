<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "categories";
    protected $fillable = ['name', 'description', 'status_id', 'image_resource_id'];
    protected $hidden = ['status_id', 'image_resource_id'];

    public function posts()
    {
        return $this->hasMany(Post::class);
    }

    public function followers()
    {
        return $this->hasMany(CategoryFollow::class, 'user_id', 'id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
