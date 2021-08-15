<?php

namespace App\Http\Controllers\Message;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Models\Message;
use App\Models\MessageHistory;
use App\Models\Notification;
use App\Models\NotificationTypes;
use App\Models\Status;
use Illuminate\Http\Request;
use App\Models\User;
use Exception;
use Illuminate\Support\Facades\Validator;

class MessageController extends Controller
{
    public function send(Request $request, int $receiver_id)
    {
        $validator = Validator::make($request->all(), [
            'message' => ['required', 'string', 'min:1']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $token = TokenController::parseToken($request->cookie('token'));

        $sender = User::find($token['uid']);
        $receiver = User::find($receiver_id);

        if (!isset($receiver)) {
            return response()->json([
                'message' => 'Utilisateur non trouvé.'
            ], 404);
        }

        $status = Status::where('name', 'actif')->first();

        $message = Message::create([
            'message' => request('message'),
            'sender_id' => $sender->id,
            'receiver_id' => $receiver->id,
            'status_id' => $status->id
        ]);

        // notify
        $Notify_type = NotificationTypes::where('name', 'message')->first();
        $status = Status::where('name', 'non-lu')->first();

        $Sender = User::findOrFail($token["uid"]);

        // Notify Password reset
        $message_notify = new Notification();

        $message_notify->user_id = $token["uid"];
        $message_notify->type_id = $Notify_type->id;
        $message_notify->text = ucfirst($Sender->username) . ' vient de vous envoyer un message.';
        $message_notify->status_id = $status->id;

        $message_notify->save();

        if ($message) {
            $mhUpdate = $this->updateMessageHistory($receiver, $sender);

            return response()->json([
                'message' => $message
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    public function getMessageHistory(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));

        $user = User::find($token['uid']);

        $mh = MessageHistory::where('receiver_id', $user->id)->orWhere('sender_id', $user->id)->where('is_open', true)->orderBy('updated_at', 'DESC')->get();

        return response()->json([
            "history" => $mh
        ], 200);
    }

    public function closeMessageHistory(Request $request, int $id)
    {
        $token = TokenController::parseToken($request->cookie('token'));

        $mh = MessageHistory::where('sender_id', $token['uid'])->where('receiver_id', $id)->first();

        if (!$mh) {
            return response()->json([
                'message' => "Aucune conversation trouvée avec cet utilisateur."
            ], 404);
        }

        $mh->is_open = 0;
        return response()->json([
            $mh->save()
        ]);

        if ($mh->save()) {
            return response()->json([
                'message' => "Conversation cachée."
            ], 200);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    public function getMessagesWith(Request $request, int $id)
    {
        $token = TokenController::parseToken($request->cookie('token'));

        $user = User::find($token['uid']);
        $to = User::find($id);

        if (!isset($to)) {
            return response()->json([
                'message' => 'Utilisateur non trouvé.'
            ], 404);
        }

        $messages = Message::where('sender_id', $user->id)
            ->where('receiver_id', $to->id)
            ->latest()
            ->get();

        return response()->json([
            'messages' => $messages
        ], 200);
    }

    private function updateMessageHistory(User $receiver, User $sender)
    {
        try {
            $mhSender = MessageHistory::firstOrCreate([
                'sender_id' => $sender->id,
                'receiver_id' => $receiver->id,
            ]);
            if (!$mhSender->is_open) {
                $mhSender->is_open = true;
                $mhSender->save();
            }
            $mhReceiver = MessageHistory::firstOrCreate([
                'sender_id' => $receiver->id,
                'receiver_id' => $sender->id,
            ]);
            if (!$mhReceiver->is_open) {
                $mhReceiver->is_open = true;
                $mhReceiver->save();
            }

            return true;
        } catch (Exception $e) {
            return false;
        }
    }
}