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


Route::group(['middleware' => 'web'], function () {
    Route::get('/', function () {
        return view('welcome');
    });

    Auth::routes();

//these routes require the user to be logged in.
    Route::group(['middleware' => ['auth']], function () {

        Route::get('u/{username}','\App\Http\Controllers\ScaffoldInterface\UserController@view');


        //cadmodel Routes
        Route::group(['middleware'=> 'web'],function(){
            Route::resource('cadmodel','\App\Http\Controllers\CadmodelController');
            Route::post('cadmodel/{id}/update','\App\Http\Controllers\CadmodelController@update');
            Route::post('cadmodel/{id}/updatemodel','\App\Http\Controllers\CadmodelController@updatemodel');
            Route::post('cadmodel/{id}/updatemodelstl','\App\Http\Controllers\CadmodelController@updatemodelSTL');
            Route::get('cadmodel/{id}/delete','\App\Http\Controllers\CadmodelController@destroy');
            Route::get('cadmodel/{id}/deleteMsg','\App\Http\Controllers\CadmodelController@DeleteMsg');
        });




//auto3dprintmaterial Routes
        Route::resource('auto3dprintmaterial', '\App\Http\Controllers\Auto3dprintmaterialController');
        Route::post('auto3dprintmaterial/{id}/update', '\App\Http\Controllers\Auto3dprintmaterialController@update');
        Route::get('auto3dprintmaterial/{id}/delete', '\App\Http\Controllers\Auto3dprintmaterialController@destroy');
        Route::get('auto3dprintmaterial/{id}/deleteMsg', '\App\Http\Controllers\Auto3dprintmaterialController@DeleteMsg');

//auto3dprintqueue Routes
        Route::get('auto3dprintqueueall', '\App\Http\Controllers\Auto3dprintqueueController@AllUserindex');

        Route::resource('auto3dprintqueue', '\App\Http\Controllers\Auto3dprintqueueController');


        Route::post('auto3dprintqueue/{id}/update', '\App\Http\Controllers\Auto3dprintqueueController@update');
        Route::get('auto3dprintqueue/{id}/delete', '\App\Http\Controllers\Auto3dprintqueueController@destroy');
        Route::get('auto3dprintqueue/{id}/deleteMsg', '\App\Http\Controllers\Auto3dprintqueueController@DeleteMsg');
        Route::get('auto3dprintqueue/{id}/gcode', '\App\Http\Controllers\Auto3dprintqueueController@showGcode');

        Route::get('auto3dprintqueue/{id}/file.stl', '\App\Http\Controllers\Auto3dprintqueueController@showSTL');
        Route::get('auto3dprintqueue/{id}/viewer', '\App\Http\Controllers\Auto3dprintqueueController@showGcodeViewer');


    });

//Sitenavigation Routes
    Route::group(['middleware' => 'web'], function () {
        Route::resource('Sitenavigation', '\App\Http\Controllers\SitenavigationController');
        Route::post('Sitenavigation/{id}/update', '\App\Http\Controllers\SitenavigationController@update');
        Route::get('Sitenavigation/{id}/delete', '\App\Http\Controllers\SitenavigationController@destroy');
        Route::get('Sitenavigation/{id}/deleteMsg', '\App\Http\Controllers\SitenavigationController@DeleteMsg');
    });


//admin route - obviously requires user to be logged in
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/admin', function () {
            return view('full_admin');
        });
    });




//There is a reason these are at the bottom of the routes file.
//Prevents it from interfering with other routes.
    //TODO: Do not allow users to choose stubs that would be inaccessible due to existing routes.
//sitepage Routes

});
Route::get('test',function(){
    return view('partials.searchUsers');
});

Route::get('printerinterface/gcode', '\App\Http\Controllers\Auto3dprintqueueController@PrinterReceiveGcode');
Route::get('auto3dprintqueue/{id}/thumb.png', '\App\Http\Controllers\Auto3dprintqueueController@showPNG');



Route::post('searchUsers','ScaffoldInterface\UserController@searchUser');
Route::get('{mystub}', '\App\Http\Controllers\SitenavigationController@showp');
