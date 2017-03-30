<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class Chore_listsUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('chore_lists_users',function (Blueprint $table){
			$table->increments('id')->unique()->index()->unsigned();
			$table->integer('chore_list_id')->unsigned()->index();
			$table->foreign('chore_list_id')->references('id')->on('chore_lists')->onDelete('cascade');
			$table->integer('user_id')->unsigned()->index();
			$table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::drop('chore_lists_users');
    }
}
