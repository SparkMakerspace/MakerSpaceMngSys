<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Chorelist.
 *
 * @author  The scaffold-interface created at 2018-02-21 03:00:52am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Chorelist extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'chorelists';

	
}
