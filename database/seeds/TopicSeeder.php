<?php

use App\Topic;
use Illuminate\Database\Seeder;

class TopicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $topic = new Topic();
        $topic->name = 'Electronics';
        $topic->save();
        $topic = new Topic();
        $topic->name = 'Welding';
        $topic->save();
        $topic = new Topic();
        $topic->name = '3D Printing';
        $topic->save();
        $topic = new Topic();
        $topic->name = 'Woodshop';
        $topic->save();
        $topic = new Topic();
        $topic->name = 'Commercial Kitchen';
        $topic->save();
        $topic = new Topic();
        $topic->name = 'Coworking';
        $topic->save();
        $topic = new Topic();
        $topic->name = 'Spark Emporium';
        $topic->save();
        $topic = new Topic();
        $topic->name = 'Print Shop';
        $topic->save();
        $topic = new Topic();
        $topic->name = 'Small Metals';
        $topic->save();
        $topic = new Topic();
        $topic->name = 'Fiber Arts';
        $topic->save();
    }
}
