<?php

use Illuminate\Database\Seeder;
use App\Role;
use App\User;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->delete();
        DB::table('role_user')->delete();

        $adminRole = new Role();
        $adminRole->name = 'admin';
        $adminRole->save();

        $moderatorRole = new Role();
        $moderatorRole->name = 'moderator';
        $moderatorRole->save();

        $userRole = new Role();
        $userRole->name = 'user';
        $userRole->save();

        $user = User::where('name', 'Administrator')->first();
        $user->attachRole($adminRole);
        $user->attachRole($moderatorRole);
        $user->attachRole($userRole);

        $user = User::where('name', 'Moderator')->first();
        $user->attachRole($moderatorRole);
        $user->attachRole($userRole);

        $user = User::where('name', 'User')->first();
        $user->attachRole($userRole);
    }
}
