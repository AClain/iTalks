<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $table = "reports";
    protected $fillable = ['reported_id', 'reason', 'type', 'status_id'];
    protected $hidden = ['reported_id', 'status_id', 'type'];

    public function reported()
    {
        return $this->belongsTo(User::class, 'id', 'reported_id');
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}
