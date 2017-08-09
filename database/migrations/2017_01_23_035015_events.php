<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Events.
 *
 * @author  The scaffold-interface created at 2017-01-24 02:17:15am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Events extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('events',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('name');
        
        $table->dateTime('startDateTime')->nullable();
        
        $table->dateTime('endDateTime')->nullable();

        $table->integer('durationMinutes')->nullable();

        $table->string('status')->default('Not Submitted');
        
        $table->String('description')->nullable();

        $table->boolean('allDay')->default(false);

        $table->string('type')->default('event');

        $table->boolean('nonMembersAllowed')->nullable();

        $table->float('materialCostPerAttendee')->nullable();

        $table->float('percentCostToSpark')->nullable();

        $table->float('memberTicketPrice')->nullable();

        $table->float('additionalNonMemberTicketPrice')->nullable();

        $table->integer('maxAttendance')->nullable();

        $table->integer('image_id')->nullable();

        $table->integer('minAttendance')->default(0);

        $table->dateTime('cutoffDate')->nullable();

        $table->boolean('is_Template')->default(0);

        $table->boolean('is_Session')->default(0);

        $table->boolean('has_Sessions')->default(0);

        $table->integer('source_id')->nullable();
        
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
     * @return  void
     */
    public function down()
    {
        Schema::drop('events');
    }
}
