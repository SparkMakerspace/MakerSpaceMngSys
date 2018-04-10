<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DoorsUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('doors_users',function (Blueprint $table){
			$table->increments('id')->unique()->index()->unsigned();
			$table->integer('door_id')->unsigned()->index();
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
        Schema::drop('doors_users');
    }
}
