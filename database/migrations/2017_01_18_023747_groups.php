<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Groups.
 *
 * @author  The scaffold-interface created at 2017-01-18 02:37:47am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Groups extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('groups',function (Blueprint $table){
        $table->increments('id');
        $table->String('name');        
        $table->String('stub');        
        $table->longText('about');        
        $table->longText('contactInfo')->nullable();        
        $table->String('visibility')->default('all');
        $table->integer('image_id')->nullable();
        
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
        Schema::drop('groups');
    }
}
