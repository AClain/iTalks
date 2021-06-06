<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call([
            StatusSeeder::class,
            ResourceSeeder::class,
            RoleSeeder::class,
            UserSeeder::class,
            PostSeeder::class,
            PostSavedSeeder::class,
            CategorySeeder::class,
            ]);
    }
}
