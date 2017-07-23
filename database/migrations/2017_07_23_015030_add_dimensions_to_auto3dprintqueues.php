<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddDimensionsToAuto3dprintqueues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('auto3dprintqueues', function (Blueprint $table) {
            $table->String('SlicerResults')->nullable();
            $table->integer('SizeX')->nullable();
            $table->integer('SizeY')->nullable();
            $table->integer('SizeZ')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('auto3dprintqueues', function (Blueprint $table) {
            $table->dropColumn('SlicerResults');
            $table->dropColumn('SizeX');
            $table->dropColumn('SizeY');
            $table->dropColumn('SizeZ');
        });
    }
}
