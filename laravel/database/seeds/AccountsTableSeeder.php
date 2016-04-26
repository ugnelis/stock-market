<?php

use Illuminate\Database\Seeder;
use App\Account;
use App\User;

class AccountsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('accounts')->delete();

        $user = User::where('name', 'Administrator')->first();
        $account = new Account();
        $account->user()->associate($user);
        $account->balance = 10000;
        $account->save();

        $user = User::where('name', 'Moderator')->first();
        $account = new Account();
        $account->user()->associate($user);
        $account->balance = 777;
        $account->save();

        $user = User::where('name', 'User')->first();
        $account = new Account();
        $account->user()->associate($user);
        $account->balance = 555;
        $account->save();
    }
}
