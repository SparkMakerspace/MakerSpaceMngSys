<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateDoorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('doors', function (Blueprint $table)
        {
            $table->increments('id')->unique();
            $table->string('name');
            $table->boolean('unlocked')->default(false);
            $table->time('sundayOpen');
            $table->time('sundayClose');
            $table->time('mondayOpen');
            $table->time('mondayClose');
            $table->time('tuesdayOpen');
            $table->time('tuesdayClose');
            $table->time('wednesdayOpen');
            $table->time('wednesdayClose');
            $table->time('thursdayOpen');
            $table->time('thursdayClose');
            $table->time('fridayOpen');
            $table->time('fridayClose');
            $table->time('saturdayOpen');
            $table->time('saturdayClose');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::drop('doors');
    }
}
