<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Role::create([
            'id' => 1,
            'name' => 'developpeur',
            'status_id' => 1
        ]);

        Role::create([
            'id' => 2,
            'name' => 'admin',
            'status_id' => 1
        ]);

        Role::create([
            'id' => 3,
            'name' => 'modérateur',
            'status_id' => 1
        ]);

        Role::create([
            'id' => 4,
            'name' => 'entreprise',
            'status_id' => 1
        ]);

        Role::create([
            'id' => 5,
            'name' => 'utilisateur',
            'status_id' => 1
        ]);
    }
}