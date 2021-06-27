<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;

    protected $table = "follows";
    protected $fillable = ['follower_id', 'following_id', 'has_notifications'];
    protected $appends = ['since'];
    protected $hidden = ['id', 'follower_id', 'following_id', 'created_at', 'updated_at'];

    // Relationship methods

    public function follower()
    {
        return $this->belongsTo(User::class, 'id', 'follower_id');
    }

    public function following()
    {
        return $this->belongsTo(User::class, 'id', 'following_id');
    }

    // Accessor methods

    public function getFollowerAttribute()
    {
        return [
            "id" => User::find($this->follower_id)->id,
            "username" => User::find($this->follower_id)->username,
            "avatar" => User::find($this->follower_id)->avatar,
        ];
    }

    public function getFollowingAttribute()
    {
        return [
            "id" => User::find($this->following_id)->id,
            "username" => User::find($this->following_id)->username,
            "avatar" => User::find($this->following_id)->avatar,
        ];
    }

    public function getSinceAttribute()
    {
        return $this->created_at;
    }
}