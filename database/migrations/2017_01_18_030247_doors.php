<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Doors.
 *
 * @author  The scaffold-interface created at 2017-01-18 03:02:47am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Doors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('doors',function (Blueprint $table){

        $table->increments('id');

        $table->string('name');
        
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

        $table->boolean('unlocked')->default(false);
        
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
        Schema::drop('doors');
    }
}
