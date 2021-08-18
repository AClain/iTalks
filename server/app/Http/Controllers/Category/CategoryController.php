<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Controllers\SearchController;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function all(Request $request)
    {
        return response()->json(Category::all());
    }

    public function get(Request $request, int $id)
    {
        $category = Category::findOrFail($id);

        $posts = Post::whereHas('categories_relation', function (Builder $query) use ($category) {
            $query->where('name', $category->name);
        });

        $search = new SearchController($request, $posts);

        return response()->json($search->getResults());
    }
}