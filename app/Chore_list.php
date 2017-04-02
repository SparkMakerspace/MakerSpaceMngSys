<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Chore_list.
 *
 * @author The scaffold-interface created at 2017-03-30 01:48:44am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $Name
 * @property string $Description
 * @property int $CompletedByUser
 * @property string $TaskTimeReqd
 * @property string $image
 * @property string $NeedDate
 * @property int $resource_id
 * @property int $user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @property-read \App\Resource $resource
 * @property-read \App\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereDescription($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereCompletedByUser($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereTaskTimeReqd($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereImage($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereNeedDate($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereResourceId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Chore_list whereDeletedAt($value)
 * @mixin \Eloquent
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
