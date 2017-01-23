<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Posts.
 *
 * @author  The scaffold-interface created at 2017-01-18 02:52:09am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Posts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('posts',function (Blueprint $table){

        $table->increments('id');
        
        $table->date('posted_at');
        
        $table->String('title');
        
        $table->longText('body');
        
        $table->String('image');
        
        /**
         * Foreignkeys section
         */
        
        
        $table->timestamps();
        
        
        $table->softDeletes();
        
        // type your addition here

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::drop('posts');
    }
}
