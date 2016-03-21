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

        $ownerRole = new Role();
        $ownerRole->name = 'owner';
        $ownerRole->save();

        $moderatorRole = new Role();
        $moderatorRole->name = 'moderator';
        $moderatorRole->save();

        $userRole = new Role();
        $userRole->name = 'user';
        $userRole->save();

        $user = User::where('name', 'Ugnius')->first();

        $user->attachRole($ownerRole);
        $user->attachRole($moderatorRole);
        $user->attachRole($userRole);

        $user = User::where('name', 'Test')->first();
        $user->attachRole($userRole);
    }
}
