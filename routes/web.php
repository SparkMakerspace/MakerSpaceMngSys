<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

// Front-facing routes
Route::get('/','HomeController@index');

// Authentication routes
Auth::routes();

// PC login route
Route::post('pclogin','PCAuthController@loginRequest')->name('pclogin')->middleware('ssl');

Route::resource('posts', 'PostController');

Route::resource('users', 'UserController');

Route::resource('groups', 'GroupController');

Route::resource('groups', 'GroupController');