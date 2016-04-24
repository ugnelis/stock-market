<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;
use DB;

use JWTAuth;
use TymonJWTAuthExceptionsJWTException;
use Auth;
use App\Stock;
use App\Notification;

class NotificationController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('jwt.auth');
    }

    /**
     * Display a listing of the notifications.
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

        $notification = Notification::with('user', 'stock')->get();
        return response()->json($notification);
    }

    /**
     * Submit notification.
     *
     * @return \Illuminate\Http\Response
     */
    public function submit(Request $reques)
    {
        $user = Auth::user();
        $rules = array(
            'symbol' => 'required|string',
            'price' => 'required|numeric|min:0'
        );
        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            // Generate an error message
            $errors = array();
            foreach ($validator->errors()->toArray() as $error)
                $errors = array_merge($errors, $error);

            return response()->json(['error' => $errors], Response::HTTP_CONFLICT);
        }

        // if stock symbol exist
        $stock = Stock::where('symbol', Input::get('symbol'))->first();

        if ($stock === null)
            return response()->json(['error' => 'Stock does not exist.'], Response::HTTP_CONFLICT);

        $notification = new Notification();
        $notification->stock()->associate($stock);
        $notification->user()->associate($user);
        $notification->price = Input::get('price');
        $notification->save();

        return response()->json(['success' => 'Notification is submited.']);
    }

    /**
     * Remove notification.
     *
     * @return \Illuminate\Http\Response
     */
    public function remove($id)
    {
        $user = Auth::user();
        $notification = $user->notifications()->find($id);

        // Check if user has rights
        if (!$user->hasRole(['admin', 'moderator']) || $notification === null) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }

        if ($notification === null) {
            return response()->json(['error' => 'Notification does not exist.'], Response::HTTP_CONFLICT);
        }

        $notification->delete();

        return response()->json(['success' => 'Notification is removed.']);
    }
}
