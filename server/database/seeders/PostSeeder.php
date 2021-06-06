<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 10; $i++) {
            Post::create([
                'title' => Str::random(5),
                'text' => Str::random(20),
                'user_id' => \random_int(1, 10),
                'status_id' => 1,
                'category_id' => \random_int(1, 6),
                'is_edited' => false
            ]);
        }
    }
}
