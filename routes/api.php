<?php

use App\Http\Controllers\Api\ReportApi;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


use App\Http\Controllers\Api\DivisiApi;
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



Route::controller(DivisiApi::class)->group(
    function () {
        Route::post('/divisi/all', 'all');
        Route::post('/divisi/delete', 'delete');
        Route::post('/divisi/view', 'view');
        Route::post('/divisi/update', 'update');
        Route::post('/divisi/create', 'create');
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


Route::controller(ReportApi::class)->group(
    function () {
        Route::post('/report/all', 'all');
        Route::post('/report/delete', 'delete');
        Route::post('/report/view', 'view');
        Route::post('/report/update', 'update');
        Route::post('/report/create', 'create');
    }
);
