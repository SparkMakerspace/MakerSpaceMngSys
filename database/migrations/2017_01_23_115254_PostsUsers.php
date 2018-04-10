<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class PostsUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('posts_users',function (Blueprint $table){
			$table->increments('id')->unique()->index()->unsigned();
			$table->integer('post_id')->unsigned()->index();
			$table->boolean('postOwner')->default(false);
			$table->integer('user_id')->unsigned()->index();
			/**
			 * Type your addition here
			 *
			 */
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return  void
     */
    public function down()
    {
        Schema::drop('posts_users');
    }
}
