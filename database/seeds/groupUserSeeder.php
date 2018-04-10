<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Group;

class groupUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::whereUsername("jjfs85")->first();
        $group = Group::whereName("Electronics")->first();
        $user->assignGroup($group);
    }
}
