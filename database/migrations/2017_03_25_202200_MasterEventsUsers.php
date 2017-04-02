<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MasterEventsUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('masterevents_users',function (Blueprint $table){
			$table->increments('id')->unique()->index()->unsigned();
			$table->integer('masterevent_id')->unsigned()->index();
			$table->foreign('masterevent_id')->references('id')->on('masterevents')->onDelete('cascade');
			$table->string('role')->default('owner');
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
        Schema::drop('masterevents_users');
    }
}
