<?php

namespace Database\Seeders;

use App\Models\Status;
use Illuminate\Database\Seeder;

class StatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Status::create([
            'id' => 1,
            'name' => 'actif'
        ]);

        Status::create([
            'id' => 2,
            'name' => 'retiré'
        ]);

        Status::create([
            'id' => 3,
            'name' => 'supprimé'
        ]);

        Status::create([
            'id' => 4,
            'name' => 'lu'
        ]);

        Status::create([
            'id' => 5,
            'name' => 'édité'
        ]);
    }
}