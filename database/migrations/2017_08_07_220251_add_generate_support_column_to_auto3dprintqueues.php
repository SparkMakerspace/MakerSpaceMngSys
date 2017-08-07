<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGenerateSupportColumnToAuto3dprintqueues extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('auto3dprintqueues', function (Blueprint $table) {
            $table->boolean('genenerateSupport')->nullable();
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
            $table->dropColumn('genenerateSupport');
        });
    }
}
