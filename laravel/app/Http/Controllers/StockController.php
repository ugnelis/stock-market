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
     * Get stocks table.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $yahooFinance = new YahooFinance();
        $yahooFinance->addFormat('s', 'symbol');
        $yahooFinance->addFormat('n', 'name');
        $yahooFinance->addFormat('l1', 'price');
        $yahooFinance->addFormat('d1', 'date');
        $yahooFinance->addFormat('t1', 'time');
        $yahooFinance->addFormat('c', 'change');
        $yahooFinance->addFormat('o', 'open');
        $yahooFinance->addFormat('h', 'high');
        $yahooFinance->addFormat('g', 'low');
        $yahooFinance->addFormat('v', 'volume');

        $yahooFinance->addStock("msft");    // Microsoft
        $yahooFinance->addStock("amzn");    // Amazon
        $yahooFinance->addStock("yhoo");    // Yahoo
        $yahooFinance->addStock("goog");    // Google
        $yahooFinance->addStock("aapl");     // Apple

        return response()->json($yahooFinance->getQuotes());
    }
}
