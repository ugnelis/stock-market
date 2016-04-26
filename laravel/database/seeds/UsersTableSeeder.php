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
            'name' => 'Administrator',
            'email' => 'admin@email.com',
            'password' => bcrypt('password')
        ]);
        $user->save();

        $user = new User([
            'name' => 'Moderator',
            'email' => 'moderator@email.com',
            'password' => bcrypt('password')
        ]);
        $user->save();

        $user = new User([
            'name' => 'User',
            'email' => 'user@email.com',
            'password' => bcrypt('password')
        ]);
        $user->save();
    }
}
