<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Services\YahooFinance;

use JWTAuth;
use TymonJWTAuthExceptionsJWTException;
use Auth;
use App\User;

class MarketController extends Controller
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
     * Get inventory.
     *
     * @return \Illuminate\Http\Response
     */
    public function inventory()
    {
        $user = Auth::user();

        $stocks = $user->inventories()->with('stock')->get();
        foreach ($stocks as $stock) {
            $result[] = [
                'symbol' => $stock->stock->symbol,
                'quantity' => $stock->quantity,
            ];
        }

        return response()->json($result);
    }
}
