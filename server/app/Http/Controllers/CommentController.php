<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\TokenController;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $comments = Comment::all();

        return response()->json([
            'comments' => $comments,
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
            'text' => 'required|max:1000',
            'user' => 'required|exists:users,username',
            'status' => 'required|exists:statuses,name',
            'post' => 'required|exists:posts,title',
            'parent' => 'nullable|exists:comments,text'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $comment = new Comment();

        $user = User::where('username', request('user'))->first();
        $status = Status::where('name', request('status'))->first();
        $post = Post::where('title', request('post'))->first();
        $parent = Comment::where('text', request('parent'))->first();

        $comment->text = request('text');
        $comment->user_id = $user->id;
        $comment->status_id = $status->id;
        $comment->post_id = $post->id;
        $comment->parent_id = $parent->id;
        $save = $comment->save();

        if ($save) {
            return response()->json([
                'message' => 'Commentaire ajouté avec succès!'
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
            'text' => 'required|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }


        $token = TokenController::parseToken($request->cookie('token'));
        if ($token["uid"] !== $comment->user_id) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à modifier cette ressource.',
            ], 403);
        }

        $user = User::where('username', request('user'))->first();
        $status = Status::where('name', request('status'))->first();

        $comment->text = request('text') ?? $comment->text;
        $comment->user_id = $user ? $user->id : $user->user_id;
        $comment->status_id = $status ? $status->id : $status->status_id;

        if ($comment->save()) {
            if ($comment->status_id !== 2) {
                return response()->json([
                    'message' => 'Vous n\'êtes pas autorisé à modifier cette ressource.',
                ], 403);
            }

            return response()->json([
                'message' => 'Commentaire mis à jour avec succès!',
                'comment' => $comment
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
    public function destroy($id, Request $request)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.'
            ], 404);
        }

        $token = TokenController::parseToken($request->cookie('token'));
        if ($token["uid"] !== $comment->user_id) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à modifier cette ressource.',
            ], 403);
        }

        $status = Status::where('name', request('status'))->first();

        $comment->status_id = $status ? $status->id : $status->status_id;

        if ($comment->save()) {
            if ($comment->status_id !== 3) {
                return response()->json([
                    'message' => 'Vous n\'êtes pas autorisé à modifier cette ressource.',
                ], 403);
            }

            return response()->json([
                'message' => 'Commentaire supprimé avec succès!',
                'comment' => $comment
            ], 201);
        }
    }
}
