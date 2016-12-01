<?php

use App\Group;
use Illuminate\Database\Seeder;

class GroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $group = new Group();
        $group->name = 'Electronics';
        $group->save();
        $group = new Group();
        $group->name = 'Welding';
        $group->save();
        $group = new Group();
        $group->name = '3D Printing';
        $group->save();
        $group = new Group();
        $group->name = 'Woodshop';
        $group->save();
        $group = new Group();
        $group->name = 'Commercial Kitchen';
        $group->save();
        $group = new Group();
        $group->name = 'Coworking';
        $group->save();
        $group = new Group();
        $group->name = 'Spark Emporium';
        $group->save();
        $group = new Group();
        $group->name = 'Print Shop';
        $group->save();
        $group = new Group();
        $group->name = 'Small Metals';
        $group->save();
        $group = new Group();
        $group->name = 'Fiber Arts';
        $group->save();
        $group = new Group();
        $group->name = 'Audio & Video';
        $group->save();
        $group = new Group();
        $group->name = 'Programming';
        $group->save();
    }
}
