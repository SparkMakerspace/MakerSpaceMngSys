<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateConnectionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \Schema::create('connections',function (Blueprint $table) {
            $table->increments('id');
            $table->integer('connection_id');
            $table->integer('workstation_id');
            $table->integer('permissionLevel')->nullable()->default(null);
            $table->string('connection_type');
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
        \Schema::drop('connections');
    }
}
