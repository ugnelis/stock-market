<?php

use Illuminate\Database\Seeder;
use App\Order;
use App\Stock;
use App\User;

class OrdersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('orders')->delete();

        $user = User::where('name', 'Administrator')->first();

        $stock = Stock::where('symbol', 'aapl')->first();
        $order = new Order();
        $order->stock()->associate($stock);
        $order->user()->associate($user);
        $order->side = 'BUY';
        $order->price = 106.67;
        $order->quantity = 10;
        $order->order = 'LIMIT';
        $order->save();

        $stock = Stock::where('symbol', 'amzn')->first();
        $order = new Order();
        $order->stock()->associate($stock);
        $order->user()->associate($user);
        $order->side = 'BUY';
        $order->price = 593.60;
        $order->quantity = 5;
        $order->order = 'LIMIT';
        $order->save();

        $stock = Stock::where('symbol', 'msft')->first();
        $order = new Order();
        $order->stock()->associate($stock);
        $order->user()->associate($user);
        $order->side = 'SELL';
        $order->price = 53.70;
        $order->quantity = 10;
        $order->order = 'LIMIT';
        $order->save();
    }
}
