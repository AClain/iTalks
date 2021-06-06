<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $table = "categories";

    protected $fillable = ['name', 'description', 'status_id', 'image_resource_id'];

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }
}
