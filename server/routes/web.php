<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Resources\ResourceController;
use App\Http\Controllers\TestController;

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

Route::get('/swagger', function () {
    return view('swagger');
});

Route::get('/swagger/get', [ResourceController::class, 'swagger']);

Route::get('/real-time-event', [TestController::class, 'index']);
