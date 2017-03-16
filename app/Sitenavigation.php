<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Sitenavigation.
 *
 * @author  The scaffold-interface created at 2017-03-16 12:59:53am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Sitenavigation extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'sitenavigations';

	
}
