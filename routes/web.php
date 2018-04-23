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
    
    // Frontpage route
        Route::get('/', function () {
            return view('welcome');
        });


    // Standard Auth routes
        Auth::routes();


    // Dev routes so we don't have to ssh so often
        Route::get('composerdumpautoload', function() {
            return exec("cd .. && composer dump-autoload");
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
    // END dev routes


    //these routes require the user to be logged in.
    Route::group(['middleware' => ['auth']], function () 
    {

        //user info edit page
            Route::get('u/{username}', '\App\Http\Controllers\ScaffoldInterface\UserController@view');


        //User search route
            Route::post('searchUsers', 'ScaffoldInterface\UserController@searchUser');


        //admin route
            Route::get('/admin', function () {return view('full_admin');});


        // User's home route
            Route::get('/home', 'DashboardController@show');

        //chorelist routes
            Route::get('chorelist/completed','\App\Http\Controllers\ChorelistController@completed');
            Route::resource('chorelist','\App\Http\Controllers\ChorelistController');
            Route::post('chorelist/{id}/update','\App\Http\Controllers\ChorelistController@update');
            Route::get('chorelist/{id}/delete','\App\Http\Controllers\ChorelistController@destroy');
            Route::get('chorelist/{id}/ididit','\App\Http\Controllers\ChorelistController@ididit');
            Route::get('chorelist/{id}/deleteMsg','\App\Http\Controllers\ChorelistController@DeleteMsg');


        //contract Routes
            Route::resource('contract', '\App\Http\Controllers\ContractController');
            Route::post('contract/{id}/update', '\App\Http\Controllers\ContractController@update');
            Route::get('contract/{id}/delete', '\App\Http\Controllers\ContractController@destroy');
            Route::get('contract/{id}/deleteMsg', '\App\Http\Controllers\ContractController@DeleteMsg');
            Route::get('terms', 'ContractController@showLatest');
            Route::post('terms', 'ContractController@acceptTerms');


        //payment_token Routes
            Route::resource('payment_token', '\App\Http\Controllers\Payment_tokenController');
            Route::post('payment_token/{id}/update', '\App\Http\Controllers\Payment_tokenController@update');
            Route::get('payment_token/{id}/delete', '\App\Http\Controllers\Payment_tokenController@destroy');
            Route::get('payment_token/{id}/deleteMsg', '\App\Http\Controllers\Payment_tokenController@DeleteMsg');      
    }); 
    // END of routes that require user login


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
        Route::post('g/{g}/update', '\App\Http\Controllers\GroupController@update')->middleware('can:update,g');
        Route::get('g/{g}/delete', '\App\Http\Controllers\GroupController@destroy')->middleware('can:delete,g');
        Route::get('g/{g}/deleteMsg', '\App\Http\Controllers\GroupController@DeleteMsg')->middleware('can:delete,g');
        Route::get('g/{g}/join', '\App\Http\Controllers\GroupController@join')->middleware('can:join,g');
        Route::get('g/{g}/leave', '\App\Http\Controllers\GroupController@leave');


    //door Routes
        Route::resource('door', '\App\Http\Controllers\DoorController');
        Route::post('door/{id}/update', '\App\Http\Controllers\DoorController@update');
        Route::get('door/{id}/delete', '\App\Http\Controllers\DoorController@destroy');
        Route::get('door/{id}/deleteMsg', '\App\Http\Controllers\DoorController@DeleteMsg');


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


    //Test routes that should be REMOVED upon release
        Route::get('test', function () {
            return view('test');
        });

        Route::get('test1', function () {
            dd(\Auth::user()->charge(100));
        });

       Route::post('charge', '\App\Http\Controllers\ScaffoldInterface\UserController@addCreditCard');
    // END Test routes


    //PC Login routes
        Route::post('pclogin', '\App\Http\Controllers\PCAuthController@loginRequest');
        Route::get('pclogin', '\App\Http\Controllers\PCAuthController@loginRequest');


    //Sitenavigation Routes
        Route::resource('Sitenavigation', '\App\Http\Controllers\SitenavigationController');
        Route::post('Sitenavigation/{id}/update', '\App\Http\Controllers\SitenavigationController@update');
        Route::get('Sitenavigation/{id}/delete', '\App\Http\Controllers\SitenavigationController@destroy');
        Route::get('Sitenavigation/{id}/deleteMsg', '\App\Http\Controllers\SitenavigationController@DeleteMsg');


    //There is a reason these are at the bottom of the routes file.
    //Prevents it from interfering with other routes.
    //TODO: Do not allow users to choose stubs that would be inaccessible due to existing routes.
    //sitepage Routes
        Route::get('{mystub}', '\App\Http\Controllers\SitenavigationController@showp');
});

