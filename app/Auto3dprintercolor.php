<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Auto3dprintercolor.
 *
 * @author  The scaffold-interface created at 2017-03-14 05:48:08am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintercolor extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'auto3dprintercolors';

	
}
