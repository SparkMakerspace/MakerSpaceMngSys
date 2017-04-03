<?php

use Illuminate\Database\Seeder;

class Auto3dPrinterColorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Auto3dprintercolor::create([
            'color'=>'RED'
        ]);


        \App\Auto3dprintercolor::create([
            'color'=>'YELLOW'
        ]);

        \App\Auto3dprintercolor::create([
            'color'=>'BLUE'
        ]);


    }
}
