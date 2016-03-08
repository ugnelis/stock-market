<?php
use App\User;

Route::get('/', function () {
    return view('index');
});

Route::group(['prefix' => 'api'], function()
{
    Route::post('login', 'AuthenticateController@login');
    Route::post('register', 'AuthenticateController@register');
    Route::get('profile', 'ProfileController@index');
});
