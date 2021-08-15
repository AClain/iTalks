<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Notification;
use App\Models\NotificationTypes;
use App\Models\Status;
use App\Models\User;
use phpDocumentor\Reflection\Types\Boolean;

class NotificationController extends Controller
{

    public function getNotification()
    {
        $notify = Notification::all();

        return response()->json([
            "Notify" => $notify
        ], 200);
    }

    public function seen(int $id)
    {

        $notify = Notification::find($id);

        if (!$notify) {
            return response()->json([
                'message' => 'La notification n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'lu')->first();

        $notify->status_id = $status->id;

        if ($notify->save()) {
            return response()->json([
                'message' => 'La notification a était mis à jour avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    public function deleteNotification(int $id)
    {

        $notify = Notification::find($id);

        if (!$notify) {
            return response()->json([
                'message' => 'La notification n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'supprimé')->first();

        $notify->status_id = $status->id;

        if ($notify->save()) {
            return response()->json([
                'message' => 'La notification supprimé avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    static function notify(string $type, int $userId, string $text, bool $admin = false, bool $moderator = false, bool $global = false)
    {

        $notifyType = NotificationTypes::where('name', $type)->first();
        $users = User::all();

        if (!$notifyType) {
            return response()->json([
                'message' => 'La type de notification n\'est pas correct.',
            ], 404);
        }

        $stat = Status::where('name', 'non-lu')->first();

        if($admin && $moderator && $global) {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }

        if (!$admin && !$moderator && !$global) {
            Notification::create([
                'user_id' => $userId,
                'type_id' => $notifyType->id,
                'text' => $text,
                'status_id' => $stat->id,
            ]);
        }

        if ($global) {
            foreach ($users as $user) {
                Notification::create([
                    'user_id' => $user->id,
                    'type_id' => $notifyType->id,
                    'text' => $text,
                    'status_id' => $stat->id,
                ]);
            }
        }

        if ($admin && $moderator) {
            foreach ($users as $user) {
                if ($user->role == "admin" || $user->role == "modérateur") {
                    Notification::create([
                        'user_id' => $user->id,
                        'type_id' => $notifyType->id,
                        'text' => $text,
                        'status_id' => $stat->id,
                    ]);
                }
            }
        }

        if ($admin && !$moderator && !$global) {
            foreach ($users as $user) {
                if ($user->role == "admin") {
                    Notification::create([
                        'user_id' => $user->id,
                        'type_id' => $notifyType->id,
                        'text' => $text,
                        'status_id' => $stat->id,
                    ]);
                }
            }
        }

        if (!$admin && $moderator && !$global) {
            foreach ($users as $user) {
                if ($user->role == "modérateur") {
                    Notification::create([
                        'user_id' => $user->id,
                        'type_id' => $notifyType->id,
                        'text' => $text,
                        'status_id' => $stat->id,
                    ]);
                }
            }
        }

    }

}
