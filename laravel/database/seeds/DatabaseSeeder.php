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

        Model::reguard();
    }
}
