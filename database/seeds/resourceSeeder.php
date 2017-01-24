<?php

use Illuminate\Database\Seeder;

class resourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Resource::create(['name'=>'3D Printer #1','location'=>'Makerspace, 1st Floor, 3D Printer Lab','type'=>'equipment','description'=>'Enclosed Folgertech 3D printer, set up for ABS printing','requiresAuth'=>1]);
    }
}
