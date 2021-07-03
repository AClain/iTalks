<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    use Votable;

    protected $table = "comments";
    protected $fillable = ['user_id', 'post_id', 'text', 'is_edited', 'parent_id', 'status_id'];
    protected $appends = ['status', 'user', 'vote_count'];
    protected $hidden = ['user_id', 'post_id', 'parent_id', 'status_id', 'votes'];

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

    // Accessor methods

    public function getStatusAttribute()
    {
        return Status::find($this->status_id)->name;
    }

    public function getVoteCountAttribute()
    {
        return $this->votes->count();
    }

    public function getUserAttribute()
    {
        $user = User::find($this->user_id);
        return [
            'id' => $user->id,
            'username' => $user->username,
        ];
    }
}
