<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 10; $i++) {
            User::create([
                'username' => Str::random(10),
                'email' => Str::random(10) . '@gmail.com',
                'password' => Hash::make('password'),
                'status_id' => 1,
                'role_id' => \random_int(1, 4),
                'avatar_resource_id' => \random_int(1, 2)
            ]);
        }
    }
}
