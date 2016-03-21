<?php

use Illuminate\Database\Seeder;
use App\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->delete();

        $user = new User([
            'name' => 'Ugnius',
            'email' => 'ugnius@email.com',
            'password' => bcrypt('password')
        ]);
        $user->save();

        $user = new User([
            'name' => 'Test',
            'email' => 'test@email.com',
            'password' => bcrypt('password')
        ]);
        $user->save();
    }
}
