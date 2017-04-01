<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Chore_list.
 *
 * @author  The scaffold-interface created at 2017-03-30 01:48:44am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Chore_list extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'chore_lists';

	
	public function resource()
	{
		return $this->belongsTo('App\Resource','resource_id');
	}

	
	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}

	

	/**
     * user.
     *
     * @return  \Illuminate\Support\Collection;
     */
    public function users()
    {
        return $this->belongsToMany('App\User');
    }

    /**
     * Assign a user.
     *
     * @param  $user
     * @return  mixed
     */
    public function assignUser($user)
    {
        return $this->users()->attach($user);
    }
    /**
     * Remove a user.
     *
     * @param  $user
     * @return  mixed
     */
    public function removeUser($user)
    {
        return $this->users()->detach($user);
    }

}
