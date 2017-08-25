<?php

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
        \App\Sitenavigation::create([
            'LinkText'=>'Groups',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'g',
            'LinkDescription'=>'Groups',
        ]);

        \App\Sitenavigation::create([
            'LinkText'=>'Posts',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'post',
            'LinkDescription'=>'A place for Posts',
        ]);

        \App\Sitenavigation::create([
            'LinkText'=>'Resources',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'resource',
            'LinkDescription'=>'A list of resources available at spark',
        ]);

        \App\Sitenavigation::create([
            'LinkText'=>'Calendar',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'event',
            'LinkDescription'=>'calendar for events and stuff',
        ]);

        \App\Sitenavigation::create([
            'LinkText'=>'Comments',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'comment',
            'LinkDescription'=>'Groups',
        ]);

        \App\Sitenavigation::create([
            'LinkText'=>'Doors',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'door',
            'LinkDescription'=>'Doors for access control',
        ]);

        \App\Sitenavigation::create([
            'LinkText'=>'Images',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'image',
            'LinkDescription'=>'An image index',
        ]);

        \App\Sitenavigation::create([
            'LinkText'=>'3D Printer Queue ',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'auto3dprintqueue',
            'LinkDescription'=>'Best part of the site',
        ]);
        \App\Sitenavigation::create([
            'LinkText'=>'test',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'test',
            'LinkDescription'=>'test',
        ]);

    }
}
