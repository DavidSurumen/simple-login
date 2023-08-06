<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\RegisterController;

use Illuminate\Support\Facades\Log;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

/*Route::get('/', function () {
    return view('welcome');
});
*/

//Route::post('/register', 'App\Http\Controllers\Auth\RegisterController@register')->name('register');
Route::post('/register', [RegisterController::class, 'register']);

Route::get('/csrf-token', function() {
    return response()->json(['csrf_token' => csrf_token()]);
});