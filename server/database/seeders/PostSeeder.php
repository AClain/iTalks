<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\PostCategory;
use App\Models\User;
use Faker\Factory;

use Illuminate\Database\Seeder;
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
        $faker = Factory::create();

        for ($i = 0; $i < 150; $i++) {
            $user = User::inRandomOrder()->first();

            $post = Post::create([
                'title' => "Post de " . $user->username,
                'text' => $faker->realText(),
                'user_id' => $user->id,
                'status_id' => 1,
                'is_edited' => false
            ]);

            PostCategory::create([
                'post_id' => $post->id,
                'category_id' => random_int(1, 6),
                'status_id' => 1
            ]);
        }
    }
}