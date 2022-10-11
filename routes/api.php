<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\EmployeApi;
use App\Http\Controllers\Api\StoreApi;
use App\Http\Controllers\Api\GroupsApi;
use App\Http\Controllers\Api\UsersApi;

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



Route::controller(StoreApi::class)->group(
    function () {
        Route::post('/store/all', 'all');
        Route::post('/store/delete', 'delete');
        Route::post('/store/view', 'view');
        Route::post('/store/update', 'update');
        Route::post('/store/create', 'create');
    }
);


Route::controller(EmployeApi::class)->group(
    function () {
        Route::post('/employe/all', 'all');
        Route::post('/employe/delete', 'delete');
        Route::post('/employe/view', 'view');
        Route::post('/employe/update', 'update');
        Route::post('/employe/create', 'create');
    }
);


Route::controller(GroupsApi::class)->group(
    function () {
        Route::post('/groups/all', 'all');
        Route::post('/groups/delete', 'delete');
        Route::post('/groups/view', 'view');
        Route::post('/groups/update', 'update');
        Route::post('/groups/create', 'create');
    }
);


Route::controller(UsersApi::class)->group(
    function () {
        Route::post('/users/all', 'all');
        Route::post('/users/delete', 'delete');
        Route::post('/users/view', 'view');
        Route::post('/users/update', 'update');
        Route::post('/users/create', 'create');
    }
);
