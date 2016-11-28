<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateActivityLogTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('activity_log', function (Blueprint $table)
        {
            $table->increments('id')->unique();
            $table->string('activity');
            $table->integer('user_id')->nullable();
            $table->integer('reference_id');
            $table->string('activity_type');
            $table->dateTime('timeStamp');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::drop('activity_log');
    }
}
