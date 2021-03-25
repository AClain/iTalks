<?php

use App\Http\Controllers\BadgeController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserBadgeController;

use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/users', [UserController::class,'index']);

Route::get('/roles', [RoleController::class,'index']);

Route::get('/posts', [PostController::class,'index']);

Route::get('/categories', [CategoryController::class,'index']);

Route::get('/comments', [CommentController::class,'index']);

Route::get('/badges', [BadgeController::class,'index']);

Route::get('/notifications', [NotificationController::class,'index']);

Route::get('/feedback', [FeedbackController::class,'index']);

Route::get('/userbadges', [UserBadgeController::class,'index']);
