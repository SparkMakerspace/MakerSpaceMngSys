<?php

use App\Workstation;
use Illuminate\Database\Seeder;

class WorkstationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $workstation = new Workstation();
        $workstation->name = 'Electronics';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Welding';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = '3D Printing';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Woodshop';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Commercial Kitchen';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Coworking';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Spark Emporium';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Print Shop';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Small Metals';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Fiber Arts';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Audio & Video';
        $workstation->save();
        $workstation = new Workstation();
        $workstation->name = 'Programming';
        $workstation->save();
    }
}
