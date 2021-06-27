<?php

namespace App\Http\Controllers\Feedback;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\Post;
use App\Models\Status;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedbackController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $feedback = Feedback::all();

        return response()->json([
            'feedback' => $feedback,
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
        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json([
                'message' => 'Le vote n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'feedback' => $feedback,
        ], 201);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            // 'type' => ['required', 'regex:/(^post$)|(^comment$)/']
            'type' => 'required', 'post' | 'comment',
            'post' => 'nullable|exists:posts,title',
            'comment' => 'nullable|exists:comments,text'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $feedback = new Feedback();

        $token = TokenController::parseToken($request->cookie('token'));
        $status = Status::where('name', 'actif')->first();
        $post = Post::where('title', request('post'))->first();
        $comment = Comment::where('text', request('comment'))->first();

        // $entity = Feedback::where(request('type'), request('entity'))->first();
        $feedback->positive = 1;
        $feedback->status_id = $status->id;
        $feedback->user_id = $token["uid"];
        if (isset($post) || isset($comment)) {
            $feedback->entity_id = ($post ? $post->id : null) | ($comment ? $comment->id : null);
        } else {
            return response()->json([
                'message' => "Une erreur s'est produite."
            ], 403);
        }
        $save = $feedback->save();

        if ($save) {
            return response()->json([
                'message' => 'Vote ajouté avec succès!'
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
     * @param  \App\Models\Feedback  $feedback
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'post' => 'nullable|exists:posts,title',
            'comment' => 'nullable|exists:comments,text'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $feedback = Feedback::find($id);

        if (!$feedback) {
            return response()->json([
                'message' => 'Le post ou commentaire n\'a pas été trouvé.',
            ], 403);
        }

        $token = TokenController::parseToken($request->cookie('token'));
        if (!$token["uid"]) {
            return response()->json([
                'message' => 'Vous n\'êtes pas autorisé à voter cette ressource.',
            ], 403);
        }

        if ($feedback->positive == 1) {
            $feedback->positive = 0;
        } else {
            $feedback->positive = 1;
        }

        if ($feedback->save()) {
            return response()->json([
                'message' => 'Vote mis à jour avec succès!',
                'feedback' => $feedback
            ], 201);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Feedback  $feedback
     * @return \Illuminate\Http\Response
     */
    public function destroy(int $id)
    {
        $feedback = Feedback::find($id);
        if (!$feedback) {
            return response()->json([
                'message' => 'Le vote n\'a pas été trouvé.',
            ], 404);
        }

        $feedback->positive = 0;

        if ($feedback->save()) {
            return response()->json([
                'message' => 'vote supprimé avec succès!',
            ], 201);
        }
    }
}
