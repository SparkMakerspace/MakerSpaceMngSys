<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Auto3dprintmaterial.
 *
 * @author  The scaffold-interface created at 2017-03-14 05:49:10am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintmaterial extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'auto3dprintmaterials';

	
}
