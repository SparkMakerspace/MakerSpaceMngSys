<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Class_template.
 *
 * @author  The scaffold-interface created at 2017-06-02 01:06:20am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Class_template extends MasterEvent
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'class_templates';

    public function owner() {
        return $this->belongsTo('App\User');
    }

    public function reviewer() {
        return $this->belongsTo('App\User');
    }
	
}
