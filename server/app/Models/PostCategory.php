<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostCategory extends Model
{
    protected $table = "post_categories";

    protected $fillable = ['post_id', 'category_id', 'status_id'];

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}