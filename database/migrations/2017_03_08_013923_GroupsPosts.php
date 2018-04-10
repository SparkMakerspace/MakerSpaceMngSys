<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GroupsPosts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('groups_posts',function (Blueprint $table){
			$table->increments('id')->unique()->index()->unsigned();
			$table->integer('group_id')->unsigned()->index();
			$table->integer('post_id')->unsigned()->index();
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
        Schema::drop('groups_posts');
    }
}
