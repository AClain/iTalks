<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Controller;
use App\Http\Controllers\SearchController;
use App\Models\Category;

use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function all(Request $request)
    {
        $searchController = new SearchController($request);
        $categories = Category::query();

        return $searchController->searchResponse($categories);
    }
}