<?php

namespace Database\Seeders;

use App\Models\Post;
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
        foreach (Post::all() as $post) {
            PostSaved::create([
                'user_id' => 1,
                'post_id' => $post->id,
                'status_id' => 1,
            ]);
        }
    }
}