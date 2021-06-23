<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Follow extends Model
{
    use HasFactory;

    protected $table = "follows";

    protected $fillable = ['follower_id', 'following_id', 'has_notifications', 'status_id'];

    public function follower()
    {
        return $this->belongsTo(User::class, 'id', 'follower_id');
    }

    public function following()
    {
        return $this->belongsTo(User::class, 'id', 'following_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}