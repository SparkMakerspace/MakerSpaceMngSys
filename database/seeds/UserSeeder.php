<?php

use App\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{

    public static $seededUsers = 5;
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $seededUsers = self::$seededUsers;
        $i = 1;
        while ($i < $seededUsers)
        {
            $user = new User();
            $first = str_random(5);
            $user->name = $first.' User';
            $user->email = $first.'@user.com';
            $user->role = 'user';
            $user->password = bcrypt('password');
            $user->save();
        }
        $user = new User();
        $user->name = 'John Scimone';
        $user->email = 'john@scimone.net';
        $user->role = 'admin';
        $user->password = bcrypt('password');
        $user->save();
    }
}
