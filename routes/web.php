<?php

use App\Http\Controllers\Dashboard;
use App\Http\Controllers\Groups;
use App\Http\Controllers\Users;
use App\Http\Controllers\Store;
use App\Http\Controllers\Employe;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\GroupsUsers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

require __DIR__ . '/auth.php';

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
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});


Route::middleware(['auth', 'verified'])->group(function () {


    Route::controller(Dashboard::class)->group(
        function () {
            Route::get('/dashboard', 'index')->name('dashboard');
        }
    );


    Route::controller(Users::class)->group(
        function () {
            Route::get('/users', 'index')->name('users');
        }
    );


    Route::controller(Groups::class)->group(
        function () {
            Route::get('/groups', 'index')->name('groups');
        }
    );


    Route::controller(Store::class)->group(
        function () {
            Route::get('/store', 'index')->name('store');
        }
    );

    Route::controller(Employe::class)->group(
        function () {
            Route::get('/employe', 'index')->name('employe');
        }
    );


    Route::get('/permission', function () {

        $dt = GroupsUsers::where('users_id', Auth::id())->with('Groups')->first();
        if ($dt) {
            $data = unserialize($dt['groups']->permission);
        } else {
            $data = [];
        }
        return response()->json(
            [
                'response' => 'success',
                'message' => $data ? 'ok' : 'Not Value',
                'data' => $data
            ],
            200
        );
    });
});
