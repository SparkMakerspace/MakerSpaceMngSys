<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Resources.
 *
 * @author  The scaffold-interface created at 2017-01-21 05:15:33am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Resources extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('resources',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('name');
        
        $table->String('location');
        
        $table->String('type');
        
        $table->String('description');
        
        $table->boolean('requiresAuth');
        
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
        Schema::drop('resources');
    }
}
