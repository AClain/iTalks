<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
    use HasFactory;

    protected $table = 'resources';

    protected $fillable = ['link', 'name', 'status_id'];

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }
}