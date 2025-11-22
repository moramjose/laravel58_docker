<?php

use Illuminate\Http\Request;

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

// Grupo de Autenticacion (Publico)
Route::group(['prefix' => 'auth'], function () {
    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
});

// Grupo Protegido (Requiere Token JWT)
Route::group(['middleware' => 'auth:api'], function() {
    Route::resource('authors', 'AuthorController');
    Route::resource('books', 'BookController');
    Route::get('export', 'ExportController@export');
});