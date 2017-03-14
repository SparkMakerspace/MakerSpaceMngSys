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

Route::group(['domain'=>'makerspacemngsys.dev'], function (){
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

//comment Routes
    Route::resource('comment','\App\Http\Controllers\CommentController');
    Route::post('comment/{id}/update','\App\Http\Controllers\CommentController@update');
    Route::get('comment/{id}/delete','\App\Http\Controllers\CommentController@destroy');
    Route::get('comment/{id}/deleteMsg','\App\Http\Controllers\CommentController@DeleteMsg');

//group Routes
    Route::group(['middleware'=> 'web'],function(){
        Route::resource('g','\App\Http\Controllers\GroupController');
        Route::post('g/{id}/update','\App\Http\Controllers\GroupController@update');
        Route::get('g/{id}/delete','\App\Http\Controllers\GroupController@destroy');
        Route::get('g/{id}/deleteMsg','\App\Http\Controllers\GroupController@DeleteMsg');
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

//image Routes
    Route::group(['middleware'=> 'web'],function(){
        Route::resource('image','\App\Http\Controllers\ImageController');
    });

    Route::group(['middleware'=>'web'],function (){
        Route::get('test',function () {
            return view('test');
        });
    });

});
Route::group(['middleware'=> 'web'],function(){
});
Route::group(['middleware'=> 'web'],function(){
});

Route::group(['middleware'=> 'web'],function(){
});

Route::group(['middleware'=> 'web'],function(){
});
//auto3dprintercolor Routes
Route::group(['middleware'=> ['web', 'auth']],function(){
  Route::resource('auto3dprintercolor','\App\Http\Controllers\Auto3dprintercolorController');
  Route::post('auto3dprintercolor/{id}/update','\App\Http\Controllers\Auto3dprintercolorController@update');
  Route::get('auto3dprintercolor/{id}/delete','\App\Http\Controllers\Auto3dprintercolorController@destroy');
  Route::get('auto3dprintercolor/{id}/deleteMsg','\App\Http\Controllers\Auto3dprintercolorController@DeleteMsg');
});

//auto3dprintmaterial Routes
Route::group(['middleware'=> ['web', 'auth']],function(){
  Route::resource('auto3dprintmaterial','\App\Http\Controllers\Auto3dprintmaterialController');
  Route::post('auto3dprintmaterial/{id}/update','\App\Http\Controllers\Auto3dprintmaterialController@update');
  Route::get('auto3dprintmaterial/{id}/delete','\App\Http\Controllers\Auto3dprintmaterialController@destroy');
  Route::get('auto3dprintmaterial/{id}/deleteMsg','\App\Http\Controllers\Auto3dprintmaterialController@DeleteMsg');
});

Route::group(['middleware'=> 'web'],function(){
});
//auto3dprintcue Routes
Route::group(['middleware'=> ['web', 'auth']],function(){
  Route::resource('auto3dprintcue','\App\Http\Controllers\Auto3dprintcueController');
  Route::post('auto3dprintcue/{id}/update','\App\Http\Controllers\Auto3dprintcueController@update');
  Route::get('auto3dprintcue/{id}/delete','\App\Http\Controllers\Auto3dprintcueController@destroy');
  Route::get('auto3dprintcue/{id}/deleteMsg','\App\Http\Controllers\Auto3dprintcueController@DeleteMsg');
});
