<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Contracts.
 *
 * @author  The scaffold-interface created at 2017-11-19 09:43:39pm
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Contracts extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('contracts',function (Blueprint $table){

        $table->increments('id');
        
        $table->longText('text');
        
        $table->String('revision');
        
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
        Schema::drop('contracts');
    }
}
