<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Sitepage.
 *
 * @author  The scaffold-interface created at 2017-03-16 01:15:50am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Sitepage extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'sitepages';

	
}
