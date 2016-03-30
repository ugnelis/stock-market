<?php

namespace App\Http\Controllers;

use DB;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Validator;

use App\Services\YahooFinance;
use JWTAuth;
use TymonJWTAuthExceptionsJWTException;
use Auth;
use App\Stock;
use App\Order;

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
        $result = array();
        foreach ($stocks as $stock) {
            $result[] = [
                'symbol' => $stock->stock->symbol,
                'quantity' => $stock->quantity,
            ];
        }

        return response()->json($result);
    }

    /**
     * Get account.
     *
     * @return \Illuminate\Http\Response
     */
    public function account()
    {
        $user = Auth::user();
        $result = [
            'balance' => $user->account->balance
        ];
        return response()->json($result);
    }

    /**
     * Submit an order.
     *
     * @return \Illuminate\Http\Response
     */
    public function submitOrder(Request $reques)
    {
        $user = Auth::user();
        $rules = array(
            'symbol' => 'required|string',
            'side' => 'required|string',
            'price' => 'required|numeric|min:0',
            'quantity' => 'required|integer|min:1',
            'order' => 'required|string'
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

        // if user wants to sell
        if (Input::get('side') == 'SELL') {
            // current orders quantity of stock
            $quantityInUse = $user->orders()->where('side', 'SELL')->where('stock_id', $stock->id)->sum('quantity');

            $inventory = $user->inventories()->where('stock_id', $stock->id)->first();

            if ($inventory === null)
                return response()->json(['error' => 'Stock does not exist in your inventory.'], Response::HTTP_CONFLICT);

            // if user doesn't have enough quantity of stocks
            if (Input::get('quantity') + $quantityInUse > $inventory->quantity)
                return response()->json(['error' => 'Submitted quantity of stock does not exist or is in use.'], Response::HTTP_CONFLICT);
        } // if user wants to buy
        else if (Input::get('side') == 'BUY') {
            // current balance which used in orders
            $balanceInUse = $user->orders()->where('side', 'BUY')->where('stock_id', $stock->id)->sum(DB::raw('quantity * price'));

            if (Input::get('quantity') * Input::get('price') + $balanceInUse > $user->account->balance)
                return response()->json(['error' => ' Not enough balance in your account.'], Response::HTTP_CONFLICT);
        } else
            return response()->json(['error' => 'Side is not correct.'], Response::HTTP_CONFLICT);

        $order = new Order();
        $order->stock()->associate($stock);
        $order->user()->associate($user);
        $order->side = Input::get('side');
        $order->price = Input::get('price');
        $order->quantity = Input::get('quantity');
        $order->order = Input::get('order');
        $order->save();

        return response()->json(['success' => 'Order is submited.']);
    }

    /**
     * Accept an order.
     *
     * @return \Illuminate\Http\Response
     */
    public function acceptOrder(Request $reques)
    {

    }

    /**
     * Remove an order.
     *
     * @return \Illuminate\Http\Response
     */
    public function removeOrder(Request $reques)
    {

    }
}
