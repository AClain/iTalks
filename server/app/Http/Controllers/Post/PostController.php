<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use App\Models\Status;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $posts = Post::all();

        return response()->json([
            'posts' => $posts,
        ], 201);
    }

    /**
     * Return the status for the given id
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function get($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Le post n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'post' => $post,
        ], 201);
    }

}
