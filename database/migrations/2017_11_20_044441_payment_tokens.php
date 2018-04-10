<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

/**
 * Class Payment_tokens.
 *
 * @author  The scaffold-interface created at 2017-11-20 04:44:41am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class PaymentTokens extends Migration
{
    /**
     * Run the migrations.
     *
     * @return  void
     */
    public function up()
    {
        Schema::create('payment_tokens',function (Blueprint $table){
        $table->increments('id');
        $table->String('token');
        $table->boolean('selected');
        $table->integer('user_id');

        /**
         * Foreignkeys section
         */
        $table->timestamps();        
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
        Schema::drop('payment_tokens');
    }
}
