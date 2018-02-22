<?php

use App\Sitenavigation;
use Illuminate\Database\Seeder;

class NavigationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Sitenavigation::create([
            'LinkText'=>'Groups',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'g',
            'LinkDescription'=>'Groups',
        ]);

        Sitenavigation::create([
            'LinkText'=>'Posts',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'post',
            'LinkDescription'=>'A place for Posts',
        ]);

        Sitenavigation::create([
            'LinkText'=>'Calendar',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'event',
            'LinkDescription'=>'calendar for events and stuff',
        ]);

        Sitenavigation::create([
            'LinkText'=>'Comments',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'comment',
            'LinkDescription'=>'Groups',
        ]);

        Sitenavigation::create([
            'LinkText'=>'Doors',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'door',
            'LinkDescription'=>'Doors for access control',
        ]);

        Sitenavigation::create([
            'LinkText'=>'Images',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'image',
            'LinkDescription'=>'An image index',
        ]);

        Sitenavigation::create([
            'LinkText'=>'Chore List',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'chorelist',
            'LinkDescription'=>'An image index',
        ]);

        Sitenavigation::firstOrCreate([
            'LinkText'=>'Member Contract',
            'LinkImage'=>'',
            'LinkLoginReqd'=>1,
            'LinkURL'=>'terms',
            'LinkDescription'=>'Read the latest member contract'
        ]);
    }
}
