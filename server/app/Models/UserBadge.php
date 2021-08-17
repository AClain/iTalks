<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserBadge extends Model
{
    use HasFactory;

    protected $table = 'user_badges';
    protected $fillable = ['user_id', 'badge_id', 'status_id'];
    protected $hidden = ['badge_id', 'status_id'];

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
