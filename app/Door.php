<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Door
 *
 * @property integer $id
 * @property string $name
 * @property boolean $unlocked
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
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $usersWithAccess
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Door whereUnlocked($value)
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
 * @mixin \Eloquent
 */
class Door extends Model
{

    public $timestamps = false;

    public function usersWithAccess()
    {
        return $this->belongsToMany('App\User','door_access')
            ->withPivot('allHoursAccess')->withTimestamps();
    }

    public function unlockDoor()
    {
        // TODO: Connect to door control module
    }

    public function lockDoor()
    {
        // TODO: Connect to door control module
    }

    public function openDoor(User $user)
    {

        // TODO: Connect to door control module
        // Signal the door to unlock for a few seconds
    }

    public function duringOpenHours ()
    {
        $currentDay = date('w'); // 0 = Sunday, 6 = Saturday
        switch ($currentDay){
            case 0:
                $currentDay = 'sunday';
                break;
            case 1:
                $currentDay = "monday";
                break;
            case 2:
                $currentDay = "tuesday";
                break;
            case 3:
                $currentDay = "wednesday";
                break;
            case 4:
                $currentDay = "thursday";
                break;
            case 5:
                $currentDay = "friday";
                break;
            case 6:
                $currentDay = "saturday";
                break;
        }
        return ($this->getAttribute($currentDay."Open")<=strftime('%H:%M:%S'))
            & ($this->getAttribute($currentDay."Close")>strftime('%H:%M:%S'));
    }
}
