<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EmailAliases extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('email_aliases', function (Blueprint $table) {
            $table->increments('alias_id')->unsigned();
            $table->string('source_username');
            $table->string('source_domain');
            $table->foreign('source_domain')->references('domain')->on('email_domains')->onDelete('cascade');
            $table->string('destination_username');
            $table->string('destination_domain');
            $table->boolean('enabled')->default(0);
            $table->unique(array('source_username','source_domain'));
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('email_aliases');
    }
}
