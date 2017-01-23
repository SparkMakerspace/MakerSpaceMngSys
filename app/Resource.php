<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Resource.
 *
 * @author  The scaffold-interface created at 2017-01-21 05:15:33am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Resource extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'resources';

	
}
