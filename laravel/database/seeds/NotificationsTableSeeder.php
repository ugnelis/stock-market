<?php

use Illuminate\Database\Seeder;
use App\Notification;
use App\Stock;
use App\User;

class NotificationsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('notifications')->delete();

        $user = User::where('name', 'User')->first();

        $stock = Stock::where('symbol', 'aapl')->first();
        $notification = new Notification();
        $notification->stock()->associate($stock);
        $notification->user()->associate($user);
        $notification->price = 106.00;
        $notification->save();

        $stock = Stock::where('symbol', 'amzn')->first();
        $notification = new Notification();
        $notification->stock()->associate($stock);
        $notification->user()->associate($user);
        $notification->price = 630.00;
        $notification->save();
    }
}
