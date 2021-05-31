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

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:20',
            'text' => 'required|max:500|'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $post = new Post();
        $post->title = trim(request('title'));
        $save = $post->save();

        if ($save) {
            return response()->json([
                'message' => 'Le statut a été créé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }


}
