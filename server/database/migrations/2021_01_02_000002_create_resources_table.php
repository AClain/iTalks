<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateResourcesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->text('link');
            $table->string('name');
            $table->foreignId('status_id');
            $table->timestamps();
        });

        $resources = [
            [
                'id' => 1,
                'link' => config('app.url') . '/api/image/placeholder/7hpWW7zWFPaHxLc.jpg',
                'name' => '7hpWW7zWFPaHxLc.jpg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 2,
                'link' => config('app.url') . '/api/image/placeholder/gl0VDqesT1VRfxA.jpg',
                'name' => 'gl0VDqesT1VRfxA.jpg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 3,
                'link' => config('app.url') . '/api/image/placeholder/h73SamaIovU09CQ.jpg',
                'name' => 'h73SamaIovU09CQ.jpg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 4,
                'link' => config('app.url') . '/api/image/placeholder/OEHOdsVvkQpqCZi.jpg',
                'name' => 'OEHOdsVvkQpqCZi.jpg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 5,
                'link' => config('app.url') . '/api/image/placeholder/italks-logo-transparent.png',
                'name' => 'italks-logo-transparent.png',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 100,
                'link' => config('app.url') . '/api/badge/badge_verified.svg',
                'name' => 'badge_verified.svg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 101,
                'link' => config('app.url') . '/api/badge/badge_alarm.svg',
                'name' => 'badge_alarm.svg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 102,
                'link' => config('app.url') . '/api/badge/badge_bug_tracker.svg',
                'name' => 'badge_bug_tracker.svg',
                'status_id' => 1
            ],
            [
                'id' => 103,
                'link' => config('app.url') . '/api/badge/badge_two_auth.svg',
                'name' => 'badge_two_auth.svg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 104,
                'link' => config('app.url') . '/api/badge/badge_chat.svg',
                'name' => 'badge_chat.svg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 105,
                'link' => config('app.url') . '/api/badge/badge_follows.svg',
                'name' => 'badge_follows.svg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 106,
                'link' => config('app.url') . '/api/badge/badge_one_year.svg',
                'name' => 'badge_one_year.svg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 107,
                'link' => config('app.url') . '/api/badge/badge_two_years.svg',
                'name' => 'badge_two_years.svg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'id' => 108,
                'link' => config('app.url') . '/api/badge/badge_three_years.svg',
                'name' => 'badge_three_years.svg',
                'status_id' => 1,
                'created_at' => now(),
                'updated_at' => now()
            ],
        ];

        foreach ($resources as $resource) {
            DB::table('resources')->insert($resource);
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('resources');
    }
}