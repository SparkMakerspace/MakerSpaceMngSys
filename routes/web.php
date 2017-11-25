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
});
Auth::routes();

//these routes require the user to be logged in.
Route::group(['middleware' => ['auth']], function () {
    Route::get('u/{username}', '\App\Http\Controllers\ScaffoldInterface\UserController@view');
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


// Used to support the searchUser partial
Route::post('searchUsers', 'ScaffoldInterface\UserController@searchUser');


//contract Routes
Route::group(['middleware' => 'web'], function () {
    Route::resource('contract', '\App\Http\Controllers\ContractController');
    Route::post('contract/{id}/update', '\App\Http\Controllers\ContractController@update');
    Route::get('contract/{id}/delete', '\App\Http\Controllers\ContractController@destroy');
    Route::get('contract/{id}/deleteMsg', '\App\Http\Controllers\ContractController@DeleteMsg');
    Route::get('terms', 'ContractController@showLatest');
    Route::post('terms', 'ContractController@acceptTerms');
});


//There is a reason these are at the bottom of the routes file.
//Prevents it from interfering with other routes.
//TODO: Do not allow users to choose stubs that would be inaccessible due to existing routes.
//sitepage Routes
//Route::get('{mystub}', '\App\Http\Controllers\SitenavigationController@showp');
Route::group(['middleware'=> 'web'],function(){
});
//payment_token Routes
Route::group(['middleware'=> 'web'],function(){
  Route::resource('payment_token','\App\Http\Controllers\Payment_tokenController');
  Route::post('payment_token/{id}/update','\App\Http\Controllers\Payment_tokenController@update');
  Route::get('payment_token/{id}/delete','\App\Http\Controllers\Payment_tokenController@destroy');
  Route::get('payment_token/{id}/deleteMsg','\App\Http\Controllers\Payment_tokenController@DeleteMsg');
});
