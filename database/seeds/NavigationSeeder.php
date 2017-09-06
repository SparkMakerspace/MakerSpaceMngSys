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
            'LinkText'=>'3D Printer Queue ',
            'LinkImage'=>'',
            'LinkLoginReqd'=>'',
            'LinkURL'=>'auto3dprintqueue',
            'LinkDescription'=>'Best part of the site',
        ]);

    }
}
