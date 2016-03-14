<?php

Route::get('/', function () {
    return view('welcome');
});

Route::group(['prefix' => 'api'], function () {
    Route::post('login', 'AuthenticateController@login');
    Route::post('register', 'AuthenticateController@register');
    Route::get('profile', 'ProfileController@index');
    Route::get('stock', 'StockController@index');

    Route::get('pages', 'PageController@index');
    Route::get('pages/{uri}', 'PageController@show');
    Route::post('pages', 'PageController@store');
    Route::put('pages/{id}', 'PageController@update');
    Route::delete('pages/{id}', 'PageController@destroy');
});
