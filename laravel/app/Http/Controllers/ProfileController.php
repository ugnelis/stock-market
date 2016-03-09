<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;
use TymonJWTAuthExceptionsJWTException;
use Auth;

class ProfileController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    public function index()
    {
        $user = Auth::user();
        $result['name'] = $user->name;
        $result['email'] = $user->email;
        $result['roles'] = $user->roles->pluck('name');

        return response()->json($result);
    }
}
