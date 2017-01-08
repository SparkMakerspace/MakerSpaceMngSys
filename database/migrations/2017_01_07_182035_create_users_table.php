<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateUsersTable extends Migration
{

    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');
            $table->text('name');
            $table->text('username');
            $table->text('email');
            $table->text('phone');
            $table->mediumText('streetAddress');
            $table->mediumText('streetAddress2')->nullable();
            $table->text('cityAddress');
            $table->text('stateAddress');
            $table->integer('zipAddress');
            $table->text('contactPref');
            $table->text('keyCard')->nullable();
            $table->text('role');
            $table->boolean('active');
            $table->text('password');
            $table->rememberToken();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('users');
    }
}
