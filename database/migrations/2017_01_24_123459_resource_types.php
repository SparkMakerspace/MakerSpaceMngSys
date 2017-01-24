<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Resource_types.
 *
 * @author  The scaffold-interface created at 2017-01-24 12:34:59am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class ResourceTypes extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('resource_types',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('value');
        
        /**
         * Foreignkeys section
         */
        
        
        
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
        Schema::drop('resource_types');
    }
}
