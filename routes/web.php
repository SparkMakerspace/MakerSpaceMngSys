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
Route::get('/', function () {
    return view('welcome');
})->name('welcome');

// Authentication routes
Auth::routes();

// Dashboard
Route::get('/home', 'HomeController@index')->name('dashboard');
Route::get('/acctMgmt', 'HomeController@acctMgmt')->name('dashboard.acctMgmt');

// Posts
Route::resource('/posts', 'PostController');

// Files
Route::resource('/files', 'FileController');

// Groups
Route::get('/groups', 'GroupController@index')->name('groups.index');
Route::get('/groups/{group}', 'GroupController@show')->name('groups.show');

// Admin section routes
Route::get('/admin',function ()
{
    return view('admin.home');
})->name('admin')->middleware('role:admin');

Route::resource('/admin/users', 'UserController');

// PC login route
Route::post('/pclogin','PCAuthController@loginRequest')->name('pclogin')->middleware('ssl');