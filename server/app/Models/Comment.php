<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $table = "comments";
    protected $fillable = ['user_id', 'post_id', 'text', 'is_edited', 'parent_id', 'status_id'];
    protected $hidden = ['user_id', 'post_id', 'parent_id', 'status_id'];

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

    public function parentComment()
    {
        return $this->belongsTo(Comment::class, 'parent_id', 'id');
    }

    public function childrenComment()
    {
        return $this->hasMany(Comment::class, 'id', 'parent_id');
    }

    public function feedback()
    {
        return $this->hasMany(Feedback::class, 'entity_id', 'id');
    }
}
