<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('events', function (Blueprint $table) {
            $table->increments('id');
            $table->text('name');
            $table->longText('description')->nullable();
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->integer('owner_id');
            $table->float('member_price');
            $table->float('non-member_price');
            $table->integer('number_attending')->default(0);
            $table->integer('number_interested')->default(0);
            $table->boolean('cancelled')->default(true);
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
        Schema::dropIfExists('events');
    }
}
