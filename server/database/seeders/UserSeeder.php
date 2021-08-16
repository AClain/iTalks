<?php

namespace Database\Seeders;

use App\Models\User;

use Faker\Factory;

use Illuminate\Database\Seeder;
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

        $faker = Factory::create();

        User::create([
            'username' => 'admin',
            'email' => 'admin' . '@example.fr',
            'password' => Hash::make('admin'),
            'email_verified' => true,
            'status_id' => 1,
            'role_id' => 2,
            'resource_id' => 5
        ]);

        for ($i = 0; $i < 350; $i++) {
            $username = $faker->userName;

            User::create([
                'username' => $username . $i,
                'email' => $username . $i . '@gmail.com',
                'password' => Hash::make('password'),
                'email_verified' => true,
                'status_id' => 1,
                'role_id' => \random_int(1, 4),
                'resource_id' => \random_int(1, 4)
            ]);
        }
    }
}