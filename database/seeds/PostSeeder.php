<?php

use App\Post;
use App\User;
use App\Workstation;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $post = new Post();
        $post->title = 'First Post in the Electronics Area';
        $post->body = 'This is the first post EVER on the new Spark website. You\'ll
            notice that everything is now well integrated and functional! You can see
            everything going on at Spark in the calendar and see what\'s happening in
            your favorite workstation! That\'s all for now.';
        $post->user()->associate(User::whereUsername('johnsucks')->first());
        $post->post_time = time();
        $post->save();
        $post->workstations()->attach(Workstation::whereName('Electronics')->first());

        $post = new Post();
        $post->title = 'Other Post';
        $post->body = 'This is NOT the first post EVER on the new Spark website.';
        $post->user()->associate(User::whereUsername('mikesucks')->first());
        $post->post_time = time();
        $post->save();
        $post->workstations()->attach(Workstation::whereName('3D Printing')->first());
    }
}
