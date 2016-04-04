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
use App\Order;
use App\Inventory;
use App\Transaction;

class OrderController extends Controller
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
     * Submit an order.
     *
     * @return \Illuminate\Http\Response
     */
    public function submit(Request $reques)
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
            $balanceInUse = $user->orders()->where('side', 'BUY')->where('stock_id', $stock->id)->sum(DB::raw('price * quantity'));

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

        if ($this->tradeIfPossible($order->id))
            return response()->json(['success' => 'Order is made.']);

        return response()->json(['success' => 'Order is submited.']);
    }

    /**
     * Trade order if it's possible
     *
     * @return bool
     */
    public function tradeIfPossible($id)
    {
        $order = Order::find($id);
        $allOrders = Order::orderBy('created_at', 'desc')->get();

        foreach ($allOrders as $otherOrder) {
            if ($order == $otherOrder)
                continue;

            if ($order->order == "MARKET" && $order->side != $otherOrder->side && $order->stock == $otherOrder->stock && $order->quantity == $otherOrder->quantity) {
                if ($this->accept($otherOrder->id)) {
                    $order->delete();
                    return true;
                }
            }

            if ($order->order == "LIMIT" && $order->side != $otherOrder->side && $order->stock == $otherOrder->stock && $order->quantity == $otherOrder->quantity) {
                if ($this->accept($otherOrder->id)) {
                    $order->delete();
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Accept an order.
     *
     * @return bool
     */
    public function accept($id)
    {
        $user = Auth::user();
        $order = Order::find($id);

        if ($order === null)
            return false;

        if ($order->user == $user)
            return false;

        $worth = $order->price * $order->quantity;

        // if user wants accept sale
        if ($order->side == 'SELL') {
            if ($worth > $user->account->balance)
                return false;

            // this user
            $account = $user->account;
            $account->balance -= $worth;
            $account->save();

            $inventory = Inventory::where('user_id', $user->id)->where('stock_id', $order->stock->id)->first();
            // create a record if doesn't exit
            if ($inventory === null) {
                $inventory = new Inventory();
                $inventory->stock()->associate($order->stock);
                $inventory->user()->associate($user);
                $inventory->quantity = $order->quantity;
                $inventory->save();
            }
            // update inventory
            if ($inventory !== null) {
                $inventory->quantity += $order->quantity;
                $inventory->save();
            }

            // other user
            $account = $order->user->account;
            $account->balance += $worth;
            $account->save();

            // update other user's inventory
            $inventory = Inventory::where('user_id', $order->user->id)->where('stock_id', $order->stock->id)->first();
            $inventory->quantity -= $order->quantity;
            $inventory->save();

            // add transaction to history
            $transaction = new Transaction();
            $transaction->seller()->associate($order->user);
            $transaction->buyer()->associate($user);
            $transaction->stock()->associate($order->stock);
            $transaction->price = $order->price;
            $transaction->quantity = $order->quantity;
            $transaction->save();

        }
        // if user wants accept buying
        if ($order->side == 'BUY') {
            $inventory = Inventory::where('user_id', $user->id)->where('stock_id', $order->stock->id)->first();

            if ($order->quanity > $inventory->quantity)
                return false;

            // this user
            $account = $user->account;
            $account->balance += $worth;
            $account->save();

            // user's inventory
            $inventory->quantity -= $order->quantity;
            $inventory->save();

            // other user
            $account = $order->user->account;
            $account->balance -= $worth;
            $account->save();

            // update other user's inventory
            $inventory = Inventory::where('user_id', $order->user->id)->where('stock_id', $order->stock->id)->first();

            // create inventory if doesn't exit
            if ($inventory === null) {
                $inventory = new Inventory();
                $inventory->stock()->associate($order->stock);
                $inventory->user()->associate($order->user);
                $inventory->quantity = $order->quantity;
                $inventory->save();
            }
            // update inventory
            if ($inventory !== null) {
                $inventory->quantity += $order->quantity;
                $inventory->save();
            }

            // add transaction to history
            $transaction = new Transaction();
            $transaction->seller()->associate($user);
            $transaction->buyer()->associate($order->user);
            $transaction->stock()->associate($order->stock);
            $transaction->price = $order->price;
            $transaction->quantity = $order->quantity;
            $transaction->save();
        }
        $order->delete();

        return true;
    }

    /**
     * Remove an order.
     *
     * @return \Illuminate\Http\Response
     */
    public function remove($id)
    {
        $user = Auth::user();
        $order = $user->orders()->find($id);

        // Check if user has rights
        if (!$user->hasRole(['owner', 'moderator']) || $order === null) {
            return response()->json(['error' => 'You don&#39;t have permission to access.'], Response::HTTP_FORBIDDEN);
        }
        $order->delete();

        return response()->json(['success' => 'Order is removed.']);
    }
}
