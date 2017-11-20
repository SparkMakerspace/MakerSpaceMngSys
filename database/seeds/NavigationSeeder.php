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
        $obj = Sitenavigation::firstOrCreate([
            'LinkText'=>'Member Contract',
            'LinkImage'=>'',
            'LinkLoginReqd'=>1,
            'LinkURL'=>'terms',
            'LinkDescription'=>'Read the latest member contract'
        ]);
    }
}
