<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EmailTlspolicies extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_tlspolicies', function (Blueprint $table) {
            $table->increments('policy_id')->unsigned();
            $table->string('domain')->unique();
            $table->enum('policy', ['none','may','encrypt','dane','dane-only','fingerprint','verify','secure']);
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('email_tlspolicies');
    }
}
