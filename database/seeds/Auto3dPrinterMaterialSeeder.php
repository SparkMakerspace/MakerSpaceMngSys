<?php

use Illuminate\Database\Seeder;

class Auto3dPrinterMaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Auto3dprintmaterial::create([
            'material'=>'PLA'
        ]);

        \App\Auto3dprintmaterial::create([
            'material'=>'ABS'
        ]);

    }
}
