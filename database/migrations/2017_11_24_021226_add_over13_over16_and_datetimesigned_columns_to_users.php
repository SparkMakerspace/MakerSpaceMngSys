<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddOver13Over16AndDatetimesignedColumnsToUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {

            $table->boolean('over13');
            $table->boolean('over16');
            $table->dateTime('acceptedTerms_timestamp')->nullable();
            $table->string('registration_state')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {

            $table->dropColumn('over13');
            $table->dropColumn('over16');
            $table->dropColumn('acceptedTerms_timestamp');
            $table->dropColumn('registration_state');
        });
    }
}
