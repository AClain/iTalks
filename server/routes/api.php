<?php

use App\Http\Controllers\ResourceController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\StatusController as AdminStatusController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'admin'/*, 'middleware' => 'auth:sanctum'*/], function () {
    // All secure url's | // Routes users (admin)
    Route::get('users', [AdminUserController::class, 'list'])->name('getAllUser');
    Route::post('users', [AdminUserController::class, 'store'])->name('createUser');
    Route::get('user/id/{id}', [AdminUserController::class, 'get'])->name('getUserById');
    Route::get('user/username/{username}', [AdminUserController::class, 'getByUsername'])->name('getUserByUsername');
    Route::post("user/{username}", [AdminUserController::class, 'update'])->name('updateUser');
    Route::post("user/{username}/avatar", [AdminUserController::class, 'updateAvatar'])->name('updateUserAvatar');
    Route::delete("user/{username}", [AdminUserController::class, 'delete'])->name('deleteUser');
    Route::delete("user/{username}/avatar", [AdminUserController::class, 'deleteAvatarOuter'])->name('deleteUserAvatar');

    // Routes Status
    Route::get('status', [AdminStatusController::class, 'index'])->name('getAllStatus');

});

Route::get('image/placeholder/{image_name}', [ResourceController::class, 'get']);
Route::get('image/{user_id}/{image_name}', [ResourceController::class, 'getUserAvatar']);
