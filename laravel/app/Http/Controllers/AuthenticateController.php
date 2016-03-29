<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

use App\Http\Requests;
use App\Http\Controllers\Controller;
use JWTAuth;
use TymonJWTAuthExceptionsJWTException;
use App\User;
use App\Role;
use App\Account;

class AuthenticateController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $rules = array(
            'email' => 'required|email',
            'password' => 'required'
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            // Generate an error message
            $errors = array();
            foreach ($validator->errors()->toArray() as $error)
                $errors = array_merge($errors, $error);

            return response()->json(['error' => $errors], Response::HTTP_CONFLICT);
        }

        try {
            if (!$token = JWTAuth::attempt(Input::all())) {
                return response()->json(['error' => 'Invalid credentials.'], Response::HTTP_UNAUTHORIZED);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Could not create token.'], Response::HTTP_NOT_IMPLEMENTED);
        }

        return response()->json(compact('token'));
    }

    public function register(Request $request)
    {
        $rules = array(
            'name' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:5'
        );

        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            // Generate an error message
            $errors = array();
            foreach ($validator->errors()->toArray() as $error)
                $errors = array_merge($errors, $error);

            return response()->json(['error' => $errors], Response::HTTP_CONFLICT);
        }

        try {
            $user = User::create([
                'name' => Input::get('name'),
                'email' => Input::get('email'),
                'password' => bcrypt(Input::get('password'))
            ]);

            $userRole = Role::where('name', 'user')->first();
            $user->attachRole($userRole);

            $account = new Account();
            $account->balance = 1000; // for new comers
            $user->account()->save($account);

        } catch (\Exception $e) {
            return response()->json(['error' => 'User already exists.'], Response::HTTP_CONFLICT);
        }

        $token = JWTAuth::fromUser($user);
        return response()->json(compact('token'));
    }
}
