<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Follow;

class FollowSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        foreach (User::all()->skip(1) as $user) {
            Follow::create([
                'follower_id' => $user->id,
                'following_id' => \random_int(2, 11),
                'has_notifications' => \random_int(0, 1)
            ]);
        };
    }
}