<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



class Feedback extends Model
{
    use HasFactory;

    protected $table = "feedback";

    protected $fillable = ['user_id', 'entity_id', 'positive', 'status_id'];

    public function post()
    {
        return $this->belongsTo(Post::class)->withDefault();
    }

    public function comment()
    {
        return $this->belongsTo(Comment::class)->withDefault();
    }

    public function user()
    {
        return $this->belongsTo(User::class)->withDefault();
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
