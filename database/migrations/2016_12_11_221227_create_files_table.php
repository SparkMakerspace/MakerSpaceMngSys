<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('files', function (Blueprint $table) {
            $table->increments('id');
            $table->text('originalname');
            $table->integer('size');
            $table->text('type');
            $table->text('path');
            $table->text('user_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        \Schema::drop('files');
    }
}
