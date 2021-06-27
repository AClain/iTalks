<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PostResource extends Model
{
    protected $table = "post_resources";
    protected $fillable = ['post_id', 'resource_id', 'status_id'];
    protected $hidden = ['post_id', 'resource_id', 'status_id'];

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
