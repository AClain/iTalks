<?php

use App\Http\Controllers\Resources\ResourceController;
// Admin controllers
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\StatusController as AdminStatusController;
use App\Http\Controllers\Admin\BadgeController as AdminBadgeController;
use App\Http\Controllers\Admin\UserBadgeController as AdminUserBadgeController;
use App\Http\Controllers\Admin\RoleController as AdminRoleController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Auth\UserAuthController;
// User controllers
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

// Admin routes
Route::group(['prefix' => 'admin', 'middleware' => ['authenticated', 'authenticated.admin']], function () {
    Route::get('users', [AdminUserController::class, 'list'])->name('getAllUser');
    Route::post('users', [AdminUserController::class, 'store'])->name('createUser');
    Route::get('user/id/{id}', [AdminUserController::class, 'get'])->name('getUserById');
    Route::get('user/username/{username}', [AdminUserController::class, 'getByUsername'])->name('getUserByUsername');
    Route::post("user/{username}", [AdminUserController::class, 'update'])->name('updateUser');
    Route::post("user/{username}/avatar", [AdminUserController::class, 'updateAvatar'])->name('updateUserAvatar');
    Route::delete("user/{username}", [AdminUserController::class, 'delete'])->name('deleteUser');
    Route::delete("user/{username}/avatar", [AdminUserController::class, 'deleteAvatarOuter'])->name('deleteUserAvatar');

    Route::get('statuses', [AdminStatusController::class, 'index'])->name('getAllStatus');
    Route::post('statuses', [AdminStatusController::class, 'store'])->name('createStatus');
    Route::get('status/{id}', [AdminStatusController::class, 'get'])->name('getStatus');
    Route::put('status/{id}', [AdminStatusController::class, 'update'])->name('updateStatus');
    Route::delete('status/{id}', [AdminStatusController::class, 'destroy'])->name('deleteStatus');

    Route::get('badges', [AdminBadgeController::class, 'index'])->name('getAllBadge');
    Route::post('badges', [AdminBadgeController::class, 'store'])->name('createBadge');
    Route::get('badge/{id}', [AdminBadgeController::class, 'get'])->name('getBadge');
    Route::put('badge/{id}', [AdminBadgeController::class, 'update'])->name('updateBadge');
    Route::post("badge/{id}/image", [AdminBadgeController::class, 'updateImage'])->name('updateBadgeImage');
    Route::delete('badge/{id}', [AdminBadgeController::class, 'destroy'])->name('deleteBadge');
    Route::delete("badge/{id}/image", [AdminBadgeController::class, 'deleteImageOuter'])->name('deleteBadgeImage');

    Route::post('badges/link/{user_id}', [AdminUserBadgeController::class, 'store'])->name('linkBadgesUser');

    Route::get('roles', [AdminRoleController::class, 'index'])->name('getAllRole');
    Route::post('roles', [AdminRoleController::class, 'store'])->name('createRole');
    Route::get('role/{id}', [AdminRoleController::class, 'get'])->name('getRole');
    Route::put('role/{id}', [AdminRoleController::class, 'update'])->name('updateRole');
    Route::delete('role/{id}', [AdminRoleController::class, 'destroy'])->name('deleteRole');
});

// Authenticated routes
Route::middleware(['authenticated'])->group(function () {
    Route::get('/authenticated', [TokenController::class, 'authenticated']);
});

// Unauthenticated routes
Route::middleware(['unauthenticated'])->group(function () {
    Route::get('/unauthenticated', [TokenController::class, 'unauthenticated']);
    Route::post('register', [UserAuthController::class, 'register'])->name('register');
    Route::post('login', [UserAuthController::class, 'login'])->name('login');
});

// Public routes
Route::get('image/placeholder/{image_name}', [ResourceController::class, 'get']);
Route::get('image/{user_id}/{image_name}', [ResourceController::class, 'getUserAvatar']);
Route::get('image/badge/{badge_id}/{image_name}', [ResourceController::class, 'getBadgeResource']);
