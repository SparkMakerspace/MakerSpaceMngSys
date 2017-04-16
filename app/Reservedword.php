<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Reservedword.
 *
 * @author  The scaffold-interface created at 2017-04-06 06:59:59pm
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Reservedword extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'reservedwords';

	
}
