<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Payment_token.
 *
 * @author  The scaffold-interface created at 2017-11-20 04:44:41am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Payment_token extends Model
{
	
	
    protected $table = 'payment_tokens';

    public function user(){
        return $this->belongsTo('App\User');
    }
	
}
