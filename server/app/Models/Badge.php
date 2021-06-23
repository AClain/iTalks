<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $table = 'badges';

    protected $fillable = ['name', 'description', 'status_id', 'image_resource_id'];

    public function image()
    {
        return $this->hasOne(Resource::class, 'id', 'image_resource_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function status()
    {
        return $this->belongsTo(Status::class);
    }
}