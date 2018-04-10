<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EventsUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('events_users',function (Blueprint $table){
			$table->increments('id')->unique()->index()->unsigned();
			$table->integer('event_id')->unsigned()->index();
			$table->boolean('eventOwner')->default(false);
			$table->string('status')->default('attending');
			$table->string('paid')->default(false);
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
        Schema::drop('events_users');
    }
}
