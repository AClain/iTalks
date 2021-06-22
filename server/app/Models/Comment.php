<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = "comments";

    protected $fillable = ['user_id', 'post_id', 'text', 'parent_id', 'status_id', 'resource_id'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }

    public function parentComment()
    {
        return $this->hasMany(Comment::class, 'id', 'id');
    }

    public function childrenComment()
    {
        return $this->belongsTo(Comment::class, 'id', 'parent_id');
    }
}
