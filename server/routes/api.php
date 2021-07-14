<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Resources\ResourceController;
// Admin controllers
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\StatusController as AdminStatusController;
use App\Http\Controllers\Admin\BadgeController as AdminBadgeController;
use App\Http\Controllers\Admin\UserBadgeController as AdminUserBadgeController;
use App\Http\Controllers\Admin\RoleController as AdminRoleController;
// User controllers
use App\Http\Controllers\Auth\UserAuthController;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\Category\CategoryController;
use App\Http\Controllers\Comment\CommentController;
use App\Http\Controllers\Feedback\FeedbackController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\User\FollowController;
use App\Http\Controllers\User\PasswordResetController;
use App\Http\Controllers\User\UserController;

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

Route::group(['prefix' => 'admin', /* 'middleware' => ['authenticated', 'authenticated.admin'] */], function () {
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

    Route::get('badges/link/{user_id}', [AdminUserBadgeController::class, 'index'])->name('getAllLinkedBadges');
    Route::post('badges/link/{user_id}', [AdminUserBadgeController::class, 'link'])->name('linkBadges');
    Route::post('badges/unlink/{user_id}', [AdminUserBadgeController::class, 'unlink'])->name('unlinkBadges');

    Route::get('roles', [AdminRoleController::class, 'index'])->name('getAllRole');
    Route::post('roles', [AdminRoleController::class, 'store'])->name('createRole');
    Route::get('role/{id}', [AdminRoleController::class, 'get'])->name('getRole');
    Route::put('role/{id}', [AdminRoleController::class, 'update'])->name('updateRole');
    Route::delete('role/{id}', [AdminRoleController::class, 'destroy'])->name('deleteRole');
});

// Authenticated routes

Route::middleware(['authenticated'])->group(function () {
    Route::get('logout', [UserAuthController::class, 'logout'])->name('logout');

    Route::get('profil', [UserController::class, 'profil'])->name('profil');
    Route::get('profil/posts', [UserController::class, 'profilPosts'])->name('profilPosts');
    Route::get('profil/comments', [UserController::class, 'profilComments'])->name('profilComments');

    Route::get('followers/{user_id}', [FollowController::class, 'getFollowers'])->name('followers');
    Route::get('followings/{user_id}', [FollowController::class, 'getFollowings'])->name('followings');

    Route::get('posts', [PostController::class, 'index'])->name('getAllPost');
    Route::get('/posts/feed', [PostController::class, 'feed'])->name('feed');
    Route::get('/posts/popular', [PostController::class, 'popular'])->name('popular');
    Route::get('post/{id}', [PostController::class, 'get'])->name('getPost');
    Route::post('posts/image', [PostController::class, 'storeSingleImage'])->name('createSingleImagePost');
    Route::post('posts/video', [PostController::class, 'storeVideo'])->name('createVideoPost');
    Route::post('posts/multipleImage', [PostController::class, 'storeMultipleImage'])->name('createMultipleImagePost');
    Route::put('post/{id}', [PostController::class, 'update'])->name('updatePost');
    Route::delete('post/{id}', [PostController::class, 'destroy'])->name('deletePost');

    Route::get('/categories', [CategoryController::class, 'all'])->name('getAllCategory');

    Route::post('comment/{post_id}', [CommentController::class, 'store'])->name('createComment');
    Route::put('comment/{id}', [CommentController::class, 'update'])->name('updateComment');
    Route::delete('comment/{id}', [CommentController::class, 'destroy'])->name('deleteComment');

    Route::get('votes/posts', [FeedbackController::class, 'voted_posts'])->name('getVotedPosts');
    Route::get('votes/comments', [FeedbackController::class, 'voted_comments'])->name('getVotedComments');
    Route::get('votes/{type}/{id}', [FeedbackController::class, 'get'])->name('getEntityVotes');
    Route::post('vote/{id}', [FeedbackController::class, 'vote'])->name('vote');

    Route::get('follow/{following_id}', [FollowController::class, 'follow'])->name('follow');
    Route::get('unfollow/{following_id}', [FollowController::class, 'unfollow'])->name('unfollow');
});

// Unauthenticated routes

Route::middleware(['unauthenticated'])->group(function () {
    Route::post('register', [UserAuthController::class, 'register'])->name('register');
    Route::post('login', [UserAuthController::class, 'login'])->name('login');

    Route::get('password_reset/{email_address}', [PasswordResetController::class, 'reset'])->name('passwordReset');
    Route::post('password_reset/{token}', [PasswordResetController::class, 'confirm'])->name('confirmReset');
});

// Public routes

Route::get('verify_email/{token}', [UserController::class, 'verifyEmail'])->name('verifyEmail');

Route::get('image/placeholder/{image_name}', [ResourceController::class, 'get']);
Route::get('image/user/{user_id}/{image_name}', [ResourceController::class, 'getUserAvatar']);
Route::get('image/post/{post_id}/{image_name}', [ResourceController::class, 'getPostImage']);
Route::get('image/badge/{image_name}', [ResourceController::class, 'getBadgeResource']);

Route::get('/test', [TestController::class, 'index']);
