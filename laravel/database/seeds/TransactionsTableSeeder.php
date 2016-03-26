<?php

use Illuminate\Database\Seeder;
use App\Transaction;
use App\Stock;
use App\User;

class TransactionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('transactions')->delete();

        $user1 = User::where('name', 'Ugnius')->first();
        $user2 = User::where('name', 'Test')->first();

        $stock = Stock::where('symbol', 'aapl')->first();
        $transaction = new Transaction();
        $transaction->stock()->associate($stock);
        $transaction->seller()->associate($user1);
        $transaction->buyer()->associate($user2);
        $transaction->price = 105.67;
        $transaction->quantity = 5;
        $transaction->save();

        $stock = Stock::where('symbol', 'msft')->first();
        $transaction = new Transaction();
        $transaction->stock()->associate($stock);
        $transaction->seller()->associate($user1);
        $transaction->buyer()->associate($user2);
        $transaction->price = 54.21;
        $transaction->quantity = 4;
        $transaction->save();

        $stock = Stock::where('symbol', 'aapl')->first();
        $transaction = new Transaction();
        $transaction->stock()->associate($stock);
        $transaction->seller()->associate($user2);
        $transaction->buyer()->associate($user1);
        $transaction->price = 104.67;
        $transaction->quantity = 2;
        $transaction->save();

        $stock = Stock::where('symbol', 'msft')->first();
        $transaction = new Transaction();
        $transaction->stock()->associate($stock);
        $transaction->seller()->associate($user2);
        $transaction->buyer()->associate($user1);
        $transaction->price = 53.13;
        $transaction->quantity = 2;
        $transaction->save();

        $stock = Stock::where('symbol', 'msft')->first();
        $transaction = new Transaction();
        $transaction->stock()->associate($stock);
        $transaction->seller()->associate($user2);
        $transaction->buyer()->associate($user1);
        $transaction->price = 53.54;
        $transaction->quantity = 5;
        $transaction->save();
    }
}
