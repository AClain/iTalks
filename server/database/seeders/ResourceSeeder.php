<?php

namespace Database\Seeders;

use App\Models\Resource;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Resource::create([
            'id' => 1,
            'link' => 'http://localhost:18080/api/image/placeholder/7hpWW7zWFPaHxLc.jpg',
            'name' => '7hpWW7zWFPaHxLc.jpg',
            'status_id' => 1
        ]);

        Resource::create([
            'id' => 2,
            'link' => 'http://localhost:18080/api/image/placeholder/gl0VDqesT1VRfxA.jpg',
            'name' => 'gl0VDqesT1VRfxA.jpg',
            'status_id' => 1
        ]);

        Resource::create([
            'id' => 3,
            'link' => 'http://localhost:18080/api/image/placeholder/h73SamaIovU09CQ.jpg',
            'name' => 'h73SamaIovU09CQ.jpg',
            'status_id' => 1
        ]);

        Resource::create([
            'id' => 4,
            'link' => 'http://localhost:18080/api/image/placeholder/OEHOdsVvkQpqCZi.jpg',
            'name' => 'OEHOdsVvkQpqCZi.jpg',
            'status_id' => 1
        ]);
    }
}