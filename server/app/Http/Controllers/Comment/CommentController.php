<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the comment.
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
     * Display a selected comment.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function get(int $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'comment' => $comment,
        ], 201);
    }

    /**
     * Store a newly created comment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, int $postId)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|max:1000',
            'parent' => 'nullable|exists:comments,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $comment = new Comment();

        $token = TokenController::parseToken($request->cookie('token'));
        $status = Status::where('name', 'actif')->first();
        $post = Post::find($postId);
        $parent = Comment::where('id', request('parent'))->first();

        $comment->text = request('text');
        $comment->user_id = $token["uid"];
        $comment->status_id = $status->id;
        $comment->post_id = $post->id;
        if (isset($parent)) {
            $comment->parent_id = $parent ? $parent->id : null;
        }
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
     * Update the specified comment.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
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

        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }

        $comment->text = request('text');
        $comment->is_edited = true;

        if ($comment->save()) {
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
     * Remove the specified comment.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, int $id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'supprimé')->first();

        $comment->status_id = $status->id;

        if ($comment->save()) {
            return response()->json([
                'message' => 'Commentaire supprimé avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}
