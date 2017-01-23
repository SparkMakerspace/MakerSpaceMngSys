<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Calendars.
 *
 * @author  The scaffold-interface created at 2017-01-23 03:49:14am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Calendars extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('calendars',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('name');
        
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
        Schema::drop('calendars');
    }
}
