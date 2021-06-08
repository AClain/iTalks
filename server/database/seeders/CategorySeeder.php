<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         // Uncategorized
         Category::create([
            'id' => 1,
            'name' => 'Uncategorized',
            'description' => 'No category',
            'image_resource_id' => 1,
            'status_id' => 1
        ]);
        // Informatic
        Category::create([
            'id' => 2,
            'name' => 'Informatic',
            'description' => 'All about computer',
            'image_resource_id' => 1,
            'status_id' => 1
        ]);
        // Electronic
        Category::create([
            'id' => 3,
            'name' => 'Electronic',
            'description' => 'All about electronic products',
            'image_resource_id' => 1,
            'status_id' => 1
        ]);
        // Beauty
        Category::create([
            'id' => 4,
            'name' => 'Beauty',
            'description' => 'All about beauty products',
            'image_resource_id' => 1,
            'status_id' => 1
        ]);
        // Game
        Category::create([
            'id' => 5,
            'name' => 'Game',
            'description' => 'All about game products and gaming',
            'image_resource_id' => 1,
            'status_id' => 1
        ]);
        // Tool
        Category::create([
            'id' => 6,
            'name' => 'Tool',
            'description' => 'All about tools',
            'image_resource_id' => 1,
            'status_id' => 1
        ]);

    }
}
