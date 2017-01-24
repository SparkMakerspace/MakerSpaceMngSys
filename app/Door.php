<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Door.
 *
 * @author The scaffold-interface created at 2017-01-18 03:02:47am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $sundayOpen
 * @property string $sundayClose
 * @property string $mondayOpen
 * @property string $mondayClose
 * @property string $tuesdayOpen
 * @property string $tuesdayClose
 * @property string $wednesdayOpen
 * @property string $wednesdayClose
 * @property string $thursdayOpen
 * @property string $thursdayClose
 * @property string $fridayOpen
 * @property string $fridayClose
 * @property string $saturdayOpen
 * @property string $saturdayClose
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereSundayOpen($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereSundayClose($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereMondayOpen($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereMondayClose($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereTuesdayOpen($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereTuesdayClose($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereWednesdayOpen($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereWednesdayClose($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereThursdayOpen($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereThursdayClose($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereFridayOpen($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereFridayClose($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereSaturdayOpen($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereSaturdayClose($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereDeletedAt($value)
 * @mixin \Eloquent
 * @property string $name
 * @property bool $unlocked
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereUnlocked($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 */
class Door extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'doors';

	

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
