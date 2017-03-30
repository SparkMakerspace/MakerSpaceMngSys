<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMasterEventsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('masterevents', function (Blueprint $table) {
            $table->increments('id')->unique()->index()->unsigned();

            $table->String('name');

            $table->String('description')->nullable();

            $table->String('status')->default('Not Approved');

            $table->time('duration');

            $table->unsignedInteger('primaryMasterEventId')->nullable();

            $table->boolean('allDay')->default(false);

            $table->string('type')->default('meetup');

            $table->boolean('nonMembersAllowed')->default(true);

            $table->float('materialCostPerAttendee')->default(0.0);

            $table->float('percentRevenueToSpark')->default(0.0);

            $table->float('memberTicketPrice')->default(0.0);

            /**
             * Foreignkeys section
             */


            $table->timestamps();


            $table->softDeletes();

            // type your addition here
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('masterevents');
    }
}
