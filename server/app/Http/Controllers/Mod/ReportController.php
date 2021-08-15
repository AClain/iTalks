<?php

namespace App\Http\Controllers\Mod;

use App\Http\Controllers\Controller;
use App\Http\Controllers\User\NotificationController;
use App\Models\Comment;
use App\Models\Message;
use App\Models\Post;
use App\Models\Report;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Validator;

class ReportController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {

        $limit = 25;

        $validator = Validator::make($request->all(), [
            'type' => ['nullable', 'regex:/(^user$)|(^post$)|(^comment)|(^message)/'],
            'startDate' => ['nullable', 'date_format:Y-m-d'],
            'endDate' => ['nullable', 'date_format:Y-m-d'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $query = Report::query();

        if(request('type')) {
            $query->where('type', request('type'));
        }

        if(request('startDate')) {
            $query->whereDate('created_at', '>=', request('startDate'));
        }

        if(request('endDate')) {
            $query->whereDate('created_at', '<=', request('endDate'));
        }

        return response()->json([
            'reports' => $query->skip((request('page') - 1) * $limit )->limit($limit)->get()
        ], 201);
    }

    /**
     * Return the report for the given id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function get(int $id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                'message' => 'Le signalement n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'report' => $report,
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function store(Request $request, int $id)
    {

        $validator = Validator::make($request->all(), [
            'type' => ['required', 'regex:/(^user$)|(^post$)|(^comment)|(^message)/'],
            'reason' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $target = DB::table(request('type') . 's')->find($id);
        $status = Status::where('name', 'actif')->first();

        if (!$target) {
            return response()->json([
                "message" => "Cible du signalement non trouvée."
            ]);
        }

        Report::create([
            "reported_id" => $target->id,
            "reason" => request('reason'),
            "type" => request('type'),
            "status_id" => $status->id
        ]);

        switch (request('type')) {
            case 'user':
                $notifyMessage = "Un utilisateur a été signalé.";
                break;
            case 'post':
                $notifyMessage = "Un post a été signalé.";
                break;
            case 'comment':
                $notifyMessage = "Un commentaire a été signalé.";
                break;
            case 'message':
                $notifyMessage = "Un message a été signalé.";
                break;
        }

        // NotificationController::notify('message', 1, $notifyMessage, true, true);

        return response()->json([
            'message' => 'Votre signalement a bien été pris en compte. Raison indiquée : ' . request('reason') . '.',
        ], 201);
    }

    /**
     * remove report
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                'message' => 'Le signalement n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'supprimé')->first();

        $report->status_id = $status->id;

        if ($report->save()) {
            return response()->json([
                'message' => 'Le signalement à était supprimé avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Warn target id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function warn(int $id)
    {

        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                "message" => "Le signalement n'a pas été trouvée."
            ]);
        }

        switch ($report->type) {
            case 'user':
                $target = User::find($report->reported_id);
                $notifyMessage = "Suite a un signalement, vous êtes sanctionné.";
                NotificationController::notify('message', $target->id, $notifyMessage);
                break;
            case 'post':
                $target = Post::find($report->reported_id);
                $notifyMessage = "Votre <a href='". config('app.client_url') ."/". $report->type ."/". $target->id ."'>post</a> a été sanctionné.";
                NotificationController::notify('message', $target->user['id'], $notifyMessage);
                break;
            case 'comment':
                $target = Comment::find($report->reported_id);
                $notifyMessage = "Votre <a href='". config('app.client_url') ."/". $report->type ."/". $target->id ."'>commentaire</a> a été sanctionné.";
                NotificationController::notify('message', $target->user['id'], $notifyMessage);
                break;
            case 'message':
                $target = Message::find($report->reported_id);
                $notifyMessage = "Votre <a href='". config('app.client_url') ."/". $report->type ."/". $target->id ."'>message</a> a été sanctionné.";
                NotificationController::notify('message', $target->user['id'], $notifyMessage);
                break;
        }
        return response()->json([
            'message' => 'La sanction a bien était envoyé.',
        ], 201);
    }

    /**
     * Banned User
     *
     * @param int $id
     * @return JsonResponse
     */
    public function ban(int $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json([
                'message' => 'L\'utilisateur n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'banni')->first();

        $user->status_id = $status->id;

        if ($user->save()) {
            return response()->json([
                'message' => 'L\'utilisateur à était banni avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * ignored report
     *
     * @param int $id
     * @return JsonResponse
     */
    public function ignored(int $id)
    {
        $report = Report::find($id);

        if (!$report) {
            return response()->json([
                'message' => 'Le signalement n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'ignored')->first();

        $report->status_id = $status->id;

        if ($report->save()) {
            return response()->json([
                'message' => 'Le signalement à était bien ignoré avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}
