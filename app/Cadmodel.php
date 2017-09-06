<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Cadmodel.
 *
 * @author  The scaffold-interface created at 2017-09-05 08:07:22pm
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Cadmodel extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'cadmodels';

	
}
