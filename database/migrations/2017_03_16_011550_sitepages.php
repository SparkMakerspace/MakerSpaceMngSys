<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Sitepages.
 *
 * @author  The scaffold-interface created at 2017-03-16 01:15:50am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Sitepages extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('sitepages',function (Blueprint $table){

        $table->increments('id');
        
        $table->String('PageTitle');
        
        $table->longText('PageContent');
        
        $table->date('PagePublishDate');
        
        $table->String('PageStub');
        
        $table->longText('PageCSS');
        
        $table->longText('PageJavaScript');
        
        $table->longText('PageKeywords');
        
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
        Schema::drop('sitepages');
    }
}
