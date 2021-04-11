<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Badge extends Model
{
    use HasFactory;

    protected $table = 'badges';

    protected $fillable = ['name', 'description', 'status_id', 'image_resource_id'];

    public function status()
    {
        return $this->hasOne(Status::class, 'id', 'status_id');
    }

    public function resource()
    {
        return $this->hasOne(Resource::class, 'id', 'image_resource_id');
    }
}