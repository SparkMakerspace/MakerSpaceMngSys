<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDoorAccessTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('door_access', function (Blueprint $table)
        {
            $table->increments('id')->unique();
            $table->integer('user_id');
            $table->integer('door_id');
            $table->boolean('allHoursAccess')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::drop('door_access');
    }
}
