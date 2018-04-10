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

    Route::get('/home', 'DashboardController@show');


    Route::get('composerdumpautoload', function() {
        return exec("cd .. && "."composer dump-autoload");
    });
    Route::get('gitpull', function() {
        if(env('APP_PLATFORM',"LINUX") == "WIN"){
            // Assume laragon on Windows
            $gitpath = "c:\\laragon\\bin\\git\\bin\\git.exe";
        } else {
            // Linux or Mac should have git in the PATH variable
            $gitpath = "git";
        }
        return exec("cd .. && ".$gitpath." pull");
    });
    Route::group(['middleware'=>'auth'], function() {
        Route::get('artisanmigrate', function(){
            if (Artisan::call('migrate')){
                return "Uwu We made a fucky wucky";
            } else {
                return "Database Changes Migrated";
            }
        });

        Route::get('artisanmigraterefreshseed', function(){
            if (Artisan::call('migrate:refresh',['--seed'=> true])){
                return "Uwu We made a fucky wucky";
            } else {
                return "Database Changes Migrated";
            }
        });

        Route::get('dbseed/{class}', function($class){
            if (Artisan::call('db:seed',['--class'=>$class])){
                return "Uwu We made a fucky wucky";
            } else {
                return "Database Changes Migrated";
            }
        });
    });

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
    Route::resource('g', '\App\Http\Controllers\GroupController');
    Route::post('g/{id}/update', '\App\Http\Controllers\GroupController@update');
    Route::get('g/{id}/delete', '\App\Http\Controllers\GroupController@destroy');
    Route::get('g/{id}/deleteMsg', '\App\Http\Controllers\GroupController@DeleteMsg');
    Route::get('g/{stub}/join', '\App\Http\Controllers\GroupController@join');
    Route::get('g/{stub}/leave', '\App\Http\Controllers\GroupController@leave');

//door Routes
    Route::resource('door', '\App\Http\Controllers\DoorController');
    Route::post('door/{id}/update', '\App\Http\Controllers\DoorController@update');
    Route::get('door/{id}/delete', '\App\Http\Controllers\DoorController@destroy');
    Route::get('door/{id}/deleteMsg', '\App\Http\Controllers\DoorController@DeleteMsg');

//resource Routes
    Route::resource('resource', '\App\Http\Controllers\ResourceController');
    Route::post('resource/{id}/update', '\App\Http\Controllers\ResourceController@update');
    Route::get('resource/{id}/delete', '\App\Http\Controllers\ResourceController@destroy');
    Route::get('resource/{id}/deleteMsg', '\App\Http\Controllers\ResourceController@DeleteMsg');

//resource_type Routes
    Route::resource('resource_type', '\App\Http\Controllers\Resource_typeController');
    Route::post('resource_type/{id}/update', '\App\Http\Controllers\Resource_typeController@update');
    Route::get('resource_type/{id}/delete', '\App\Http\Controllers\Resource_typeController@destroy');
    Route::get('resource_type/{id}/deleteMsg', '\App\Http\Controllers\Resource_typeController@DeleteMsg');

//event Routes
    Route::get('event/my', 'EventController@myEvents');
    Route::resource('event/template', 'EventTemplateController');
    Route::post('event/template/{id}/update', '\App\Http\Controllers\EventTemplateController@update');
    Route::get('event/template/{id}/delete', '\App\Http\Controllers\EventTemplateController@destroy');
    Route::get('event/template/{id}/deleteMsg', '\App\Http\Controllers\EventTemplateController@DeleteMsg');
    Route::resource('event', '\App\Http\Controllers\EventController');
    Route::post('event/{id}/update', '\App\Http\Controllers\EventController@update');
    Route::get('event/{id}/delete', '\App\Http\Controllers\EventController@destroy');
    Route::get('event/{id}/deleteMsg', '\App\Http\Controllers\EventController@DeleteMsg');


//image Routes
    Route::resource('image', '\App\Http\Controllers\ImageController');

//test Route
    Route::get('test', function () {
        return view('test');
    });

    Route::get('test1', function () {
        dd(\Auth::user()->charge(100));
    });

    Route::post('charge', '\App\Http\Controllers\ScaffoldInterface\UserController@addCreditCard');


//these routes require the user to be logged in.
    Route::group(['middleware' => ['auth']], function () {

        Route::get('u/{username}', '\App\Http\Controllers\ScaffoldInterface\UserController@view');
        Route::get('subscription/payment', function () {
            return view('partials.searchUsers');
        });

        //cadmodel Routes
        Route::group(['middleware' => 'web'], function () {
            Route::resource('cadmodel', '\App\Http\Controllers\CadmodelController');
            Route::post('cadmodel/{id}/update', '\App\Http\Controllers\CadmodelController@update');
            Route::post('cadmodel/{id}/updatemodel', '\App\Http\Controllers\CadmodelController@updatemodel');
            Route::get('cadmodel/{id}/delete', '\App\Http\Controllers\CadmodelController@destroy');
            Route::get('cadmodel/{id}/deleteMsg', '\App\Http\Controllers\CadmodelController@DeleteMsg');
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

        Route::post('searchUsers', 'ScaffoldInterface\UserController@searchUser');
    });

    Route::post('pclogin', '\App\Http\Controllers\PCAuthController@loginRequest');
    Route::get('pclogin', '\App\Http\Controllers\PCAuthController@loginRequest');

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

    Route::get('chorelist/completed','\App\Http\Controllers\ChorelistController@completed');


    Route::resource('chorelist','\App\Http\Controllers\ChorelistController');

    Route::post('chorelist/{id}/update','\App\Http\Controllers\ChorelistController@update');
    Route::get('chorelist/{id}/delete','\App\Http\Controllers\ChorelistController@destroy');
    Route::get('chorelist/{id}/ididit','\App\Http\Controllers\ChorelistController@ididit');
    Route::get('chorelist/{id}/deleteMsg','\App\Http\Controllers\ChorelistController@DeleteMsg');
    /********************* chorelist ***********************************************/



});


//contract Routes
Route::group(['middleware' => 'web'], function () {
    Route::resource('contract', '\App\Http\Controllers\ContractController');
    Route::post('contract/{id}/update', '\App\Http\Controllers\ContractController@update');
    Route::get('contract/{id}/delete', '\App\Http\Controllers\ContractController@destroy');
    Route::get('contract/{id}/deleteMsg', '\App\Http\Controllers\ContractController@DeleteMsg');
    Route::get('terms', 'ContractController@showLatest');
    Route::post('terms', 'ContractController@acceptTerms');
});

//payment_token Routes
Route::group(['middleware' => 'web'], function () {
    Route::resource('payment_token', '\App\Http\Controllers\Payment_tokenController');
    Route::post('payment_token/{id}/update', '\App\Http\Controllers\Payment_tokenController@update');
    Route::get('payment_token/{id}/delete', '\App\Http\Controllers\Payment_tokenController@destroy');
    Route::get('payment_token/{id}/deleteMsg', '\App\Http\Controllers\Payment_tokenController@DeleteMsg');
});

Route::get('printerinterface/gcode', '\App\Http\Controllers\Auto3dprintqueueController@PrinterReceiveGcode');
Route::get('auto3dprintqueue/{id}/thumb.png', '\App\Http\Controllers\Auto3dprintqueueController@showPNG');


Route::get('test', function () {
    return view('test');
});

//There is a reason these are at the bottom of the routes file.
//Prevents it from interfering with other routes.
//TODO: Do not allow users to choose stubs that would be inaccessible due to existing routes.
//sitepage Routes
Route::get('{mystub}', '\App\Http\Controllers\SitenavigationController@showp');
//testing Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('testing','\App\Http\Controllers\TestingController');
  Route::post('testing/{id}/update','\App\Http\Controllers\TestingController@update');
  Route::get('testing/{id}/delete','\App\Http\Controllers\TestingController@destroy');
  Route::get('testing/{id}/deleteMsg','\App\Http\Controllers\TestingController@DeleteMsg');
});

