<?php

use App\Post;
use Illuminate\Database\Seeder;

class postSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $post = Post::create([
            'title'=>'General Post for all groups',
            'body'=>'<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut pulvinar sit amet quam quis mattis. Aliquam vulputate justo non nisi vulputate consectetur. Phasellus elementum magna enim, id feugiat est feugiat a. !!BREAK!!Duis vehicula sapien sed justo vulputate condimentum. Aenean porttitor dictum elementum. Maecenas velit sem, mattis non dapibus sed, rhoncus nec ligula. Mauris vitae eros quis nisi posuere tincidunt. In hac habitasse platea dictumst. Nullam sodales nunc in risus maximus vestibulum.</p><p>Suspendisse ipsum metus, semper et mi non, consectetur malesuada neque. Integer vel magna est. Vivamus fringilla est vitae aliquet sagittis. Donec a varius orci. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed imperdiet ornare ligula, ut pharetra metus dapibus sit amet. Phasellus condimentum nibh vel dui ornare consectetur. Aenean tincidunt efficitur tellus at scelerisque. Nunc rutrum eu magna quis aliquet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In porttitor purus eget dictum tempor.</p><p>Nam at massa tortor. Vestibulum ligula libero, sollicitudin ac pretium et, sodales vitae massa. Aenean lacus sapien, euismod ac mattis id, condimentum commodo risus. Proin dolor metus, pharetra quis congue at, viverra eu tellus. Sed commodo justo vitae massa ornare, sit amet sagittis diam varius. Etiam nibh libero, pharetra id porttitor id, molestie sollicitudin lorem. Donec eu mi ac nisl sodales dapibus. Proin vitae quam nec sapien blandit vestibulum sit amet non arcu. Nam nibh diam, mollis ut eros et, vestibulum malesuada neque. Curabitur lacinia ullamcorper leo sed ultricies. Pellentesque convallis sapien lacus, id sagittis velit tincidunt at. Curabitur vel ullamcorper magna, vitae suscipit purus. Donec tristique, erat ullamcorper convallis ultricies, urna tortor elementum tellus, ut ornare magna purus in enim.</p><p>Nullam eget quam in risus aliquet varius. Ut facilisis mauris eu sapien scelerisque scelerisque. Suspendisse potenti. Ut pharetra egestas nibh sit amet mattis. Donec a mauris sed ante aliquet dapibus maximus sit amet ex. Quisque cursus condimentum urna, quis blandit urna vestibulum at. Donec mollis malesuada sapien at aliquam. Nunc vel accumsan diam. Nulla scelerisque hendrerit dapibus. In hac habitasse platea dictumst. Sed ac vulputate risus, eu vulputate arcu. Nullam risus erat, ultrices ac ipsum id, ultrices iaculis dui. Fusce ullamcorper urna fringilla commodo venenatis. Aliquam vel ligula lacinia enim tincidunt ullamcorper. Donec volutpat leo non leo placerat malesuada.</p><p>Aenean orci risus, aliquam non pharetra a, placerat eu augue. Aliquam iaculis non odio at fermentum. Curabitur blandit, felis sed ultricies gravida, dolor dui molestie ipsum, vitae eleifend velit orci convallis sem. Nulla pretium posuere neque, sit amet finibus tellus faucibus vitae. Sed leo nisi, aliquam maximus orci vitae, accumsan congue eros. Mauris sagittis nisl at quam tristique, vel lobortis ante tincidunt. Donec euismod arcu sit amet diam convallis, et fermentum nibh tristique. Quisque vehicula ex sit amet tellus maximus, non posuere quam elementum. Aliquam hendrerit vulputate lacinia. Nunc venenatis quis odio at placerat. Fusce consectetur maximus risus ac rhoncus. Maecenas laoreet justo dui, a aliquet magna tempor vitae. Integer et mi risus. Integer maximus sem non magna aliquet, vitae iaculis mauris viverra.</p>',
            'posted_at'=>'2017-03-11 16:30:00'
        ]);
        $post->users()->attach(2,['postOwner'=>1]);
        $post->groups()->sync(\App\Group::all());
    }
}
