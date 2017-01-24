<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Event.
 *
 * @author  The scaffold-interface created at 2017-01-24 02:17:15am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Event extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'events';

    public function attendees() {
        return $this->belongsToMany('App\User','events_users')->withPivot('eventOwner');
    }

    public function owner() {
        return $this->attendees()->wherePivot('eventOwner','=',true)->first();
    }
}
