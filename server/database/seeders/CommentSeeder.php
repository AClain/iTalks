<?php

namespace Database\Seeders;

use App\Models\Comment;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CommentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Normal/parent comments
        for ($i = 0; $i < 10; $i++) {
            Comment::create([
                'text' => Str::random(20),
                'post_id' => random_int(1, 10),
                'user_id' => random_int(1, 10),
                'status_id' => 1,
                'parent_id' => null,
            ]);
        }

        // Children comments
        for ($i = 0; $i < 5; $i++) {
            Comment::create([
                'text' => Str::random(20),
                'post_id' => random_int(1, 10),
                'user_id' => random_int(1, 10),
                'status_id' => 1,
                'parent_id' => random_int(1, 10),
            ]);
        }
    }
}