<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBadge extends Model
{
    use HasFactory;

    protected $table = 'user_badges';

    protected $fillable = ['user_id', 'badge_id', 'status_id'];

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function badge()
    {
        return $this->hasOne(Badge::class, 'id', 'badge_id');
    }

    public function status_id()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }
}
