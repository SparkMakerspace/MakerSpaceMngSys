<?php

use App\TopicUserConnection;
use Illuminate\Database\Seeder;

class TopicUserConnectionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $connection = new TopicUserConnection();
        $connection->user = \App\User::find(rand(1,UserSeeder::$seededUsers));
        $connection->topic = \App\Topic::find(1);
    }
}
