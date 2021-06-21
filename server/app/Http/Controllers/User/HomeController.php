<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Post;

class HomeController extends Controller
{
    public function home()
    {
        return response()->json([
            'message' => 'HOME'
        ]);
    }

    public function searchIndex()
    {
        $search = \request()->query('query');
        if ($search) {
            $posts = Post::where('title', 'LIKE', '%'.$search.'%')->orderBy('id', 'desc')->simplePaginate(3);
        } else {
            $posts = Post::orderBy('id', 'desc')->simplePaginate(3);
        }
        // \dd(\request()->query('query'));
        return \response(['posts' => $posts]);
    }

}
