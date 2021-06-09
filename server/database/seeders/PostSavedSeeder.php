<?php

namespace Database\Seeders;

use App\Models\PostSaved;
use Illuminate\Database\Seeder;

class PostSavedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 5; $i++) {
            PostSaved::create([
                'user_id' => \random_int(1, 10),
                'post_id' => \random_int(1, 10),
                'status_id' => 1,
            ]);
        }
    }
}
