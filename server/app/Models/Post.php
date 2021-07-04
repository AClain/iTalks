<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use Votable;

    protected $table = "posts";
    protected $fillable = ['title', 'text', 'is_edited', 'user_id', 'status_id'];
    protected $appends = ['status', 'user', 'vote_count', 'comment_count', 'associated_resources'];
    protected $hidden = ['user_id', 'status_id', 'votes', 'comments', 'resources'];

    // Relationship methods

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function users()
    {
        return $this->hasMany(PostSaved::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }

    public function resources()
    {
        return $this->belongsToMany(Resource::class, 'post_resources')->withTimestamps();
    }

    public function categories()
    {
        return $this->hasMany(Category::class);
    }

    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

    public function votes()
    {
        return $this->hasMany(Feedback::class, 'entity_id');
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
        $feedback = Feedback::where('user_id', $this->user_id)->where('entity_id', $this->id)->first();
        return [
            'id' => $user->id,
            'username' => $user->username,
            'feedback' => $feedback ? $feedback->positive : null
        ];
    }

    public function getCommentCountAttribute()
    {
        return $this->comments->count();
    }

    public function getAssociatedResourcesAttribute()
    {
        return $this->resources;
    }
}