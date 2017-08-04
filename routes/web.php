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
Route::post('/pclogin','PCAuthController@loginRequest');


Route::group(['middleware'=> 'web'], function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Auth::routes();

    Route::get('/home', 'DashboardController@show');

//post Routes
    Route::resource('post', '\App\Http\Controllers\PostController');
    Route::post('post/{id}/update', '\App\Http\Controllers\PostController@update');
    Route::get('post/{id}/delete', '\App\Http\Controllers\PostController@destroy');
    Route::get('post/{id}/deleteMsg', '\App\Http\Controllers\PostController@DeleteMsg');

//comment Routes
    Route::resource('comment', '\App\Http\Controllers\CommentController');
    Route::post('comment/{id}/update', '\App\Http\Controllers\CommentController@update');
    Route::get('comment/{id}/delete', '\App\Http\Controllers\CommentController@destroy');
    Route::get('comment/{id}/deleteMsg', '\App\Http\Controllers\CommentController@DeleteMsg');

//group Routes
    Route::resource('g','\App\Http\Controllers\GroupController');
    Route::post('g/{id}/update','\App\Http\Controllers\GroupController@update');
    Route::get('g/{id}/delete','\App\Http\Controllers\GroupController@destroy');
    Route::get('g/{id}/deleteMsg','\App\Http\Controllers\GroupController@DeleteMsg');

//door Routes
    Route::resource('door','\App\Http\Controllers\DoorController');
    Route::post('door/{id}/update','\App\Http\Controllers\DoorController@update');
    Route::get('door/{id}/delete','\App\Http\Controllers\DoorController@destroy');
    Route::get('door/{id}/deleteMsg','\App\Http\Controllers\DoorController@DeleteMsg');

//resource Routes
    Route::resource('resource','\App\Http\Controllers\ResourceController');
    Route::post('resource/{id}/update','\App\Http\Controllers\ResourceController@update');
    Route::get('resource/{id}/delete','\App\Http\Controllers\ResourceController@destroy');
    Route::get('resource/{id}/deleteMsg','\App\Http\Controllers\ResourceController@DeleteMsg');

//resource_type Routes
    Route::resource('resource_type','\App\Http\Controllers\Resource_typeController');
    Route::post('resource_type/{id}/update','\App\Http\Controllers\Resource_typeController@update');
    Route::get('resource_type/{id}/delete','\App\Http\Controllers\Resource_typeController@destroy');
    Route::get('resource_type/{id}/deleteMsg','\App\Http\Controllers\Resource_typeController@DeleteMsg');

//event Routes
    Route::get('event/my','EventController@myEvents');
    Route::resource('event/template','EventTemplateController');
    Route::post('event/template/{id}/update','\App\Http\Controllers\EventTemplateController@update');
    Route::get('event/template/{id}/delete','\App\Http\Controllers\EventTemplateController@destroy');
    Route::get('event/template/{id}/deleteMsg','\App\Http\Controllers\EventTemplateController@DeleteMsg');
    Route::resource('event','\App\Http\Controllers\EventController');
    Route::post('event/{id}/update','\App\Http\Controllers\EventController@update');
    Route::get('event/{id}/delete','\App\Http\Controllers\EventController@destroy');
    Route::get('event/{id}/deleteMsg','\App\Http\Controllers\EventController@DeleteMsg');


//image Routes
    Route::resource('image','\App\Http\Controllers\ImageController');

//test Route
    Route::get('test',function () {return view('test');});

//these routes require the user to be logged in.
    Route::group(['middleware'=>['auth']], function (){
//auto3dprintercolor Routes
        Route::resource('auto3dprintercolor', '\App\Http\Controllers\Auto3dprintercolorController');
        Route::post('auto3dprintercolor/{id}/update', '\App\Http\Controllers\Auto3dprintercolorController@update');
        Route::get('auto3dprintercolor/{id}/delete', '\App\Http\Controllers\Auto3dprintercolorController@destroy');
        Route::get('auto3dprintercolor/{id}/deleteMsg', '\App\Http\Controllers\Auto3dprintercolorController@DeleteMsg');

//auto3dprintmaterial Routes
        Route::resource('auto3dprintmaterial', '\App\Http\Controllers\Auto3dprintmaterialController');
        Route::post('auto3dprintmaterial/{id}/update', '\App\Http\Controllers\Auto3dprintmaterialController@update');
        Route::get('auto3dprintmaterial/{id}/delete', '\App\Http\Controllers\Auto3dprintmaterialController@destroy');
        Route::get('auto3dprintmaterial/{id}/deleteMsg', '\App\Http\Controllers\Auto3dprintmaterialController@DeleteMsg');

//auto3dprintqueue Routes

        Route::resource('auto3dprintqueue', '\App\Http\Controllers\Auto3dprintqueueController');



        Route::post('auto3dprintqueue/{id}/update', '\App\Http\Controllers\Auto3dprintqueueController@update');
        Route::get('auto3dprintqueue/{id}/delete', '\App\Http\Controllers\Auto3dprintqueueController@destroy');
        Route::get('auto3dprintqueue/{id}/deleteMsg', '\App\Http\Controllers\Auto3dprintqueueController@DeleteMsg');
        Route::get('auto3dprintqueue/{id}/gcode', '\App\Http\Controllers\Auto3dprintqueueController@showGcode');

        Route::get('auto3dprintqueue/{id}/file.stl', '\App\Http\Controllers\Auto3dprintqueueController@showSTL');
        Route::get('auto3dprintqueue/{id}/viewer', '\App\Http\Controllers\Auto3dprintqueueController@showGcodeViewer');




    });
    Route::get('printerinterface/gcode', '\App\Http\Controllers\Auto3dprintqueueController@PrinterReceiveGcode');
    Route::get('auto3dprintqueue/{id}/thumb.png', '\App\Http\Controllers\Auto3dprintqueueController@showPNG');

//sitenavigation Routes
    Route::group(['middleware'=> 'web'],function(){
        Route::resource('sitenavigation','\App\Http\Controllers\SitenavigationController');
        Route::post('sitenavigation/{id}/update','\App\Http\Controllers\SitenavigationController@update');
        Route::get('sitenavigation/{id}/delete','\App\Http\Controllers\SitenavigationController@destroy');
        Route::get('sitenavigation/{id}/deleteMsg','\App\Http\Controllers\SitenavigationController@DeleteMsg');
    });


//admin route - obviously requires user to be logged in
Route::group(['middleware'=> ['auth']],function() {
    Route::get('/admin', function () {
        return view('full_admin');
    });
});


//chore_list Routes
  Route::resource('chore_list','\App\Http\Controllers\Chore_listController');
  Route::post('chore_list/{id}/update','\App\Http\Controllers\Chore_listController@update');
  Route::get('chore_list/{id}/delete','\App\Http\Controllers\Chore_listController@destroy');
  Route::get('chore_list/{id}/deleteMsg','\App\Http\Controllers\Chore_listController@DeleteMsg');




//There is a reason these are at the bottom of the routes file.
//Prevents it from interfering with other routes.
    //TODO: Do not allow users to choose stubs that would be inaccessible due to existing routes.
//sitepage Routes
    Route::resource('sitepage','\App\Http\Controllers\SitepageController');
    Route::post('sitepage/{id}/update','\App\Http\Controllers\SitepageController@update');
    Route::get('sitepage/{id}/delete','\App\Http\Controllers\SitepageController@destroy');
    Route::get('sitepage/{id}/deleteMsg','\App\Http\Controllers\SitepageController@DeleteMsg');
    Route::get('{mystub}','\App\Http\Controllers\SitepageController@showp');
});

//class_template Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('class_template','\App\Http\Controllers\Class_templateController');
  Route::post('class_template/{id}/update','\App\Http\Controllers\Class_templateController@update');
  Route::get('class_template/{id}/delete','\App\Http\Controllers\Class_templateController@destroy');
  Route::get('class_template/{id}/deleteMsg','\App\Http\Controllers\Class_templateController@DeleteMsg');
});
