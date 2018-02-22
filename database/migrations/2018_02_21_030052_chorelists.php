<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Chorelists.
 *
 * @author  The scaffold-interface created at 2018-02-21 03:00:52am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Chorelists extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('chorelists',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('ChoreName')->nullable();
        
        $table->date('RequireDate')->nullable();
        
        $table->date('CompletedDate')->nullable();
        
        $table->integer('CreatorID')->nullable();
        
        $table->integer('CompleterID')->nullable();

        $table->longText('ChoreDescription')->nullable();
        
        $table->float('HoursREQD')->nullable();
        
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
        Schema::drop('chorelists');
    }
}
