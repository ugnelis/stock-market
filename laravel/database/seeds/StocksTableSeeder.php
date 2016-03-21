<?php

use Illuminate\Database\Seeder;
use App\Stock;

class StocksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stocks')->delete();

        $stock = new Stock([
            'symbol' => 'aapl'
        ]);
        $stock->save();

        $stock = new Stock([
            'symbol' => 'amzn'
        ]);
        $stock->save();

        $stock = new Stock([
            'symbol' => 'goog'
        ]);
        $stock->save();

        $stock = new Stock([
            'symbol' => 'msft'
        ]);
        $stock->save();

        $stock = new Stock([
            'symbol' => 'yhoo'
        ]);
        $stock->save();
    }
}
