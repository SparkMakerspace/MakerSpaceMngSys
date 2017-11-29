<?php

use Illuminate\Database\Seeder;

class resourceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \App\Resource_type::create(['value'=>'equipment']);
        \App\Resource_type::create(['value'=>'space']);
    }
}
