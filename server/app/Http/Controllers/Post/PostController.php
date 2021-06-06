<?php

namespace App\Http\Controllers\Post;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Post;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use App\Models\Status;
use App\Models\User;

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
            'title' => 'required|max:100',
            'text' => 'required|max:1000',
            'user' => 'required|exists:users,username',
            'status' => 'required|exists:statuses,name',
            'category' => 'required|exists:categories,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $post = new Post();

        $user = User::where('username', request('user'))->first();
        $status = Status::where('name', request('status'))->first();
        $category = Category::where('name', request('category'))->first();

        $post->title = trim(request('title'));
        $post->text = request('text');
        $post->user_id = $user->id;
        $post->status_id = $status->id;
        $post->category_id = $category->id;
        $save = $post->save();

        if ($save) {
            return response()->json([
                'message' => 'Le post a été créé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
/**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|max:100',
            'text' => 'required|max:1000|',
            'user' => 'exists:users,username',
            'status' => 'exists:statuses,name',
            'category' => 'exists:categories,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Le post n\'a pas été trouvé.',
            ], 404);
        }

        $user = User::where('username', request('user'))->first();
        $status = Status::where('name', request('status'))->first();
        $category = Category::where('name', request('category'))->first();

        $post->title = request('title') ?? $post->title;
        $post->text = request('text') ?? $post->text;
        $post->user_id  = $user ? $user->id : $user->user_id;
        $post->status_id = $status ? $status->id : $user->status_id;
        $post->category_id = $category ? $category->id : $category->category_id;
        $post->is_edited = 1;
        $update = $post->save();

        if ($update) {
            $post->user = User::find($post->user_id);
            $post->status = Status::find($post->status_id);
            $post->category = Category::find($post->category_id);

            unset($post->user_id);
            unset($post->status_id);
            unset($post->category_id);

            return response()->json([
                'message' => 'Post mis à jour avec succès!',
                'post' => $post
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json([
                'message' => 'Le post n\'a pas été trouvé.'
            ], 404);
        }

        $delete = $post->delete();

        if ($delete) {
            return response()->json([
                'message' => 'Post supprimé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

}
