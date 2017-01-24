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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index');

//post Routes
Route::resource('post','\App\Http\Controllers\PostController');
Route::post('post/{id}/update','\App\Http\Controllers\PostController@update');
Route::get('post/{id}/delete','\App\Http\Controllers\PostController@destroy');
Route::get('post/{id}/deleteMsg','\App\Http\Controllers\PostController@DeleteMsg');
//group Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('group','\App\Http\Controllers\GroupController');
  Route::post('group/{id}/update','\App\Http\Controllers\GroupController@update');
  Route::get('group/{id}/delete','\App\Http\Controllers\GroupController@destroy');
  Route::get('group/{id}/deleteMsg','\App\Http\Controllers\GroupController@DeleteMsg');
});

//group Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('group','\App\Http\Controllers\GroupController');
  Route::post('group/{id}/update','\App\Http\Controllers\GroupController@update');
  Route::get('group/{id}/delete','\App\Http\Controllers\GroupController@destroy');
  Route::get('group/{id}/deleteMsg','\App\Http\Controllers\GroupController@DeleteMsg');
});

//post Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('post','\App\Http\Controllers\PostController');
  Route::post('post/{id}/update','\App\Http\Controllers\PostController@update');
  Route::get('post/{id}/delete','\App\Http\Controllers\PostController@destroy');
  Route::get('post/{id}/deleteMsg','\App\Http\Controllers\PostController@DeleteMsg');
});

//door Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('door','\App\Http\Controllers\DoorController');
  Route::post('door/{id}/update','\App\Http\Controllers\DoorController@update');
  Route::get('door/{id}/delete','\App\Http\Controllers\DoorController@destroy');
  Route::get('door/{id}/deleteMsg','\App\Http\Controllers\DoorController@DeleteMsg');
});

//resource Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('resource','\App\Http\Controllers\ResourceController');
  Route::post('resource/{id}/update','\App\Http\Controllers\ResourceController@update');
  Route::get('resource/{id}/delete','\App\Http\Controllers\ResourceController@destroy');
  Route::get('resource/{id}/deleteMsg','\App\Http\Controllers\ResourceController@DeleteMsg');
});

Route::group(['middleware'=> 'web'],function(){
});
//calendar Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('calendar','\App\Http\Controllers\CalendarController');
  Route::post('calendar/{id}/update','\App\Http\Controllers\CalendarController@update');
  Route::get('calendar/{id}/delete','\App\Http\Controllers\CalendarController@destroy');
  Route::get('calendar/{id}/deleteMsg','\App\Http\Controllers\CalendarController@DeleteMsg');
});

Route::group(['middleware'=> 'web'],function(){
});

Route::group(['middleware'=> 'web'],function(){
});
//resource_type Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('resource_type','\App\Http\Controllers\Resource_typeController');
  Route::post('resource_type/{id}/update','\App\Http\Controllers\Resource_typeController@update');
  Route::get('resource_type/{id}/delete','\App\Http\Controllers\Resource_typeController@destroy');
  Route::get('resource_type/{id}/deleteMsg','\App\Http\Controllers\Resource_typeController@DeleteMsg');
});
//event Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('event','\App\Http\Controllers\EventController');
  Route::post('event/{id}/update','\App\Http\Controllers\EventController@update');
  Route::get('event/{id}/delete','\App\Http\Controllers\EventController@destroy');
  Route::get('event/{id}/deleteMsg','\App\Http\Controllers\EventController@DeleteMsg');
});
