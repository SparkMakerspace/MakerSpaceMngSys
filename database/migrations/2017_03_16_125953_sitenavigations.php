<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Sitenavigations.
 *
 * @author  The scaffold-interface created at 2017-03-16 12:59:53am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Sitenavigations extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('sitenavigations',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('LinkText');
        
        $table->String('LinkImage');
        
        $table->String('LinkLoginReqd');
        
        $table->String('LinkURL');
        
        $table->String('LinkDescription');
        
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
        Schema::drop('sitenavigations');
    }
}
