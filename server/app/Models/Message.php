<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $table = "messages";

    protected $fillable = ['sender_id', 'receiver_id', 'text', 'is_open', 'status_id'];

    public function sender()
    {
        return $this->belongsTo(User::class, 'id', 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'id', 'receiver_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class, 'id', 'status_id');
    }
}