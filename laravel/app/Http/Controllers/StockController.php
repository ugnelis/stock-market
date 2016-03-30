<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;

use App\Services\YahooFinance;
use App\Transaction;
use App\Stock;

class StockController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
    }

    /**
     * Get stocks.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $yahooFinance = new YahooFinance();
        return response()->json($yahooFinance->getQuotes("msft,amzn,yhoo,goog,aapl"));
    }

    /**
     * Display the specified stock.
     *
     * @param  string $symbol
     * @return Response
     */
    public function show($symbol)
    {
        $yahooFinance = new YahooFinance();
        return response()->json($yahooFinance->getQuotes($symbol));
    }

    /**
     * Display the specified stock history.
     *
     * @param  string $symbol
     * @return Response
     */
    public function history($symbol)
    {
        $yahooFinance = new YahooFinance();
        return response()->json($yahooFinance->getHistoryQuote($symbol, 9));
    }

    /**
     * Display the specified stock transactions history.
     *
     * @param  string $symbol
     * @return Response
     */
    public function transactions($symbol)
    {
        $stock = Stock::where('symbol', strtolower($symbol))->first();

        $result = [];
        $transactions = $stock->transactions;
        foreach ($transactions as $transaction) {
            $result[] = [
                'symbol' => $transaction->stock->symbol,
                'price' => $transaction->price,
                'quantity' => $transaction->quantity,
                'time' => $transaction->created_at->toDateTimeString()
            ];
        }

        return response()->json($result);
    }

    /**
     * Display the specified stock orders.
     *
     * @param  string $symbol
     * @return Response
     */
    public function orders($symbol)
    {
        $stock = Stock::where('symbol', strtolower($symbol))->first();

        $result = [];
        $orders = $stock->orders;
        foreach ($orders as $order) {
            $result[] = [
                'id' => $order->id,
                'symbol' => $order->stock->symbol,
                'side' => $order->side,
                'price' => $order->price,
                'quantity' => $order->quantity,
                'order' => $order->order,
                'time' => $order->created_at->toDateTimeString()
            ];
        }

        return response()->json($result);
    }
}
