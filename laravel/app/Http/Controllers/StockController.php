<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests;
use App\Services\YahooFinance;

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

        return response()->json($yahooFinance->getHistoryQuote($symbol, 7));
    }
}
