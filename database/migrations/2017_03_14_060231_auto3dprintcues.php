<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Auto3dprintcues.
 *
 * @author  The scaffold-interface created at 2017-03-14 06:02:31am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintcues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('auto3dprintcues',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('Name');
        
        $table->integer('Infill');
        
        $table->String('Status')->nullable();
        
        $table->boolean('Notified');
        
        /**
         * Foreignkeys section
         */
        
        $table->integer('auto3dprintercolor_id')->unsigned()->nullable();
        $table->foreign('auto3dprintercolor_id')->references('id')->on('auto3dprintercolors')->onDelete('cascade');
        
        $table->integer('auto3dprintmaterial_id')->unsigned()->nullable();
        $table->foreign('auto3dprintmaterial_id')->references('id')->on('auto3dprintmaterials')->onDelete('cascade');
        
        $table->integer('user_id')->unsigned()->nullable();
        $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        
        
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
        Schema::drop('auto3dprintcues');
    }
}
