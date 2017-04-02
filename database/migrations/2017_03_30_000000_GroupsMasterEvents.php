<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class GroupsMasterEvents extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('groups_masterevents',function (Blueprint $table){
			$table->increments('id')->unique()->index()->unsigned();
			$table->integer('masterEvent_id')->unsigned()->index();
			$table->foreign('masterEvent_id')->references('id')->on('masterevents')->onDelete('cascade');
			$table->integer('group_id')->unsigned()->index();
			$table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
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
        Schema::drop('groups_masterevents');
    }
}
