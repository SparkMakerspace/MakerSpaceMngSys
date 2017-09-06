<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Cadmodels.
 *
 * @author  The scaffold-interface created at 2017-09-05 08:07:22pm
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Cadmodels extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('cadmodels',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('Name');
        
        $table->String('Description');
        
        $table->longText('ModelFile');
        
        $table->String('Material');
        
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
        Schema::drop('cadmodels');
    }
}
