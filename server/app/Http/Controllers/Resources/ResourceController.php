<?php

namespace App\Http\Controllers\Resources;

use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Response;

class ResourceController extends Controller
{
    public function get($image_name)
    {
        $path = public_path('/storage/placeholder/');

        if (!File::exists($path . $image_name)) {
            abort(404);
        }

        $full_path = $path . $image_name;

        $file = File::get($full_path);
        $type = File::mimeType($full_path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }

    public function getUserAvatar($user_id, $image_name)
    {
        $path = public_path('/storage/images/users/' . $user_id . '/');

        if (!File::exists($path . $image_name)) {
            abort(404);
        }

        $full_path = $path . $image_name;

        $file = File::get($full_path);
        $type = File::mimeType($full_path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }

    public function getBadgeResource($badge_id, $image_name)
    {
        $path = public_path('/storage/images/badges/' . $badge_id . '/');

        if (!File::exists($path . $image_name)) {
            abort(404);
        }

        $full_path = $path . $image_name;

        $file = File::get($full_path);
        $type = File::mimeType($full_path);

        $response = Response::make($file, 200);
        $response->header("Content-Type", $type);

        return $response;
    }
}