<?php

use App\Image;
use Illuminate\Database\Seeder;

class imageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $reserve = 100;
        $defaults = [];

        array_push($defaults,[
            'name'=>'userNoImage.svg',
            'description'=>'No User Image',
            'size'=>0,
            'path'=>'Images/userNoImage.svg',
            'user_id'=>1
        ]);
        array_push($defaults,[
            'name'=>'groupNoImage.svg',
            'description'=>'No Group Image',
            'size'=>0,
            'path'=>'Images/groupNoImage.svg',
            'user_id'=>1
        ]);

        for( $i = 0; $i < $reserve; $i++){
            if (array_key_exists($i, $defaults)) {
                Image::create($defaults[$i]);
            }
            else {
                Image::create([
                    'name'=>'noImage.svg',
                    'description'=>'reserved',
                    'size'=>0,
                    'path'=>'Images/noImage.svg',
                    'user_id'=>1
                ]);
            }
        }
    }
}
