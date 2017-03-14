<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Auto3dprintercolors.
 *
 * @author  The scaffold-interface created at 2017-03-14 05:48:08am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintercolors extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('auto3dprintercolors',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('color');
        
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
        Schema::drop('auto3dprintercolors');
    }
}
