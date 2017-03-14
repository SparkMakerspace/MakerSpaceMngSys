<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Auto3dprintqueue.
 *
 * @author  The scaffold-interface created at 2017-03-14 06:02:31am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintqueue extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'auto3dprintqueues';

	
	public function auto3dprintercolor()
	{
		return $this->belongsTo('App\Auto3dprintercolor','auto3dprintercolor_id');
	}

	
	public function auto3dprintmaterial()
	{
		return $this->belongsTo('App\Auto3dprintmaterial','auto3dprintmaterial_id');
	}

	
	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}

	
}
