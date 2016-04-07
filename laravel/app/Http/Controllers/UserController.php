<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

use App\Http\Requests;
use App\User;
use Auth;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['show']]);
    }

    /**
     * Display a listing of the users.
     *
     * @return Response
     */
    public function index()
    {
        // Check if user has rights
        $user = Auth::user();
        if (!$user->hasRole(['admin'])) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        $user = User::all();
        return response()->json($user);
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  int $id
     * @return Response
     */
    public function destroy($id)
    {
        // Check if user has rights
        $user = Auth::user();
        if (!$user->hasRole(['admin'])) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        $user = User::find($id);
        if ($user === null) {
            return response()->json(['error' => 'User does not exist.'], Response::HTTP_CONFLICT);
        }

        $user->delete();

        return response()->json(['success' => 'User is removed.']);
    }
}
