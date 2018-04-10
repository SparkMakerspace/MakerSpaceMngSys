<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EventsGroups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('events_groups',function (Blueprint $table){
			$table->increments('id')->unique()->index()->unsigned();
			$table->integer('event_id')->unsigned()->index();
			$table->integer('group_id')->unsigned()->index();
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
        Schema::drop('events_groups');
    }
}
