<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Auto3dprintmaterials.
 *
 * @author  The scaffold-interface created at 2017-03-14 05:49:10am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintmaterials extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('auto3dprintmaterials',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('material');
        
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
        Schema::drop('auto3dprintmaterials');
    }
}
