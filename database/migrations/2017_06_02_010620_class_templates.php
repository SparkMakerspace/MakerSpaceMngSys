<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Class_templates.
 *
 * @author  The scaffold-interface created at 2017-06-02 01:06:20am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class ClassTemplates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('class_templates',function (Blueprint $table){

        $table->increments('id');

        $table->string('status')->default('Not Submitted');

        $table->String('description')->nullable();

        $table->boolean('nonMembersAllowed')->default(true);

        $table->float('materialCostPerAttendee')->default(0.0);

        $table->float('percentCostToSpark')->default(0.0);

        $table->float('memberTicketPrice')->default(0.0);

        $table->float('additionalNonMemberTicketPrice')->default(0.0);

        $table->integer('minAttendance',false,true)->default(0);

        $table->integer('maxAttendance',false,true)->defalt(20);

        $table->integer('image_id')->nullable();

        $table->dateTime('cutoffDate')->nullable();

        $table->integer('instructor_id')->nullable();

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
        Schema::drop('class_templates');
    }
}
