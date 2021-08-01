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

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
