<?php

use Illuminate\Database\Seeder;

class builtInGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        App\Group::create([
            'name'=>'Administrators',
            'stub'=>'Admin',
            'about'=>'Administrators Group',
            'visibility'=>'hidden',
            'image_id'=>2,
        ]);
        
        App\Group::create([
            'name'=>'Calendar Administrators',
            'stub'=>'CalAdmin',
            'about'=>'Calendar Admin Group',
            'visibility'=>'hidden',
            'image_id'=>2,
        ]);
    }
}
