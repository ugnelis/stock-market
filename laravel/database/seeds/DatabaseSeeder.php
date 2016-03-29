<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $this->call('UsersTableSeeder');
        $this->command->info('Users table seeded!');
        $this->call('RolesTableSeeder');
        $this->command->info('Roles table seeded!');
        $this->call('PagesTableSeeder');
        $this->command->info('Pages table seeded!');
        $this->call('StocksTableSeeder');
        $this->command->info('Stocks table seeded!');
        $this->call('InventoriesTableSeeder');
        $this->command->info('Inventories table seeded!');
        $this->call('TransactionsTableSeeder');
        $this->command->info('Transactions table seeded!');
        $this->call('AccountsTableSeeder');
        $this->command->info('Accounts table seeded!');
        $this->call('OrdersTableSeeder');
        $this->command->info('Orders table seeded!');

        Model::reguard();
    }
}
