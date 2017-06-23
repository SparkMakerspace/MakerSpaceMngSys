<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use MaddHatter\LaravelFullcalendar\IdentifiableEvent;

/**
 * Class Event.
 *
 * @author The scaffold-interface created at 2017-01-24 02:17:15am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $name
 * @property string $startDateTime
 * @property string $endDateTime
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $attendees
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereStartDateTime($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereEndDateTime($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereDescription($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereDeletedAt($value)
 * @mixin \Eloquent
 * @property bool $allDay
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Event[] $groups
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereAllDay($value)
 * @property string $type
 * @property bool $nonMembersAllowed
 * @property float $materialCostPerAttendee
 * @property float $percentCostToSpark
 * @property float $memberTicketPrice
 * @property float $additionalNonMemberTicketPrice
 * @property int $maxAttendance
 * @property int $memberAttendees
 * @property int $nonMemberAttendees
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereNonMembersAllowed($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereMaterialCostPerAttendee($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event wherePercentCostToSpark($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereMemberTicketPrice($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereAdditionalNonMemberTicketPrice($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereMaxAttendance($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereMemberAttendees($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereNonMemberAttendees($value)
 * @property int $image_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereImageId($value)
 * @property-read \App\Image $image
 * @property string $status
 * @method static \Illuminate\Database\Query\Builder|\App\Event whereStatus($value)
 */
class Event extends Model implements IdentifiableEvent
{
	use Commentable;
	use HasImage;
	use SoftDeletes;

	protected $guarded = [];

	protected $dates = ['deleted_at','startDateTime','endDateTime'];

    protected $dateFormat = 'Y-m-d H:i:s';

    protected $table = 'events';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function attendees() {
        return $this->belongsToMany('App\User','events_users')->withPivot(['eventOwner','status','paid']);
    }

    /**
     * @return mixed
     */
    public function owner() {
        return $this->attendees()->wherePivot('eventOwner','=',true)->first();
    }

    public function getId()
    {
        return $this->id;
    }

    /**
     * Get the event's title
     *
     * @return string
     */
    public function getTitle(){
        return $this->name;
    }

    /**
     * Is it an all day event?
     *
     * @return bool
     */
    public function isAllDay(){
        return $this->allDay;
    }

    /**
     * Get the start time
     *
     * @return DateTime
     */
    public function getStart(){
        return $this->startDateTime;
    }

    /**
     * Get the end time
     *
     * @return DateTime
     */
    public function getEnd(){
        return $this->endDateTime;
    }

	/**
     * group.
     *
     * @return  \Illuminate\Support\Collection;
     */
    public function groups()
    {
        return $this->belongsToMany('App\Group','events_groups');
    }

    /**
     * Assign a group.
     *
     * @param  $group
     * @return  mixed
     */
    public function assignGroup($group)
    {
        return $this->groups()->attach($group);
    }
    /**
     * Remove a group.
     *
     * @param  $group
     * @return  mixed
     */
    public function removeGroup($group)
    {
        return $this->groups()->detach($group);
    }

    /**
     * Assign a user.
     *
     * @param $user
     * @param bool $eventOwner
     * @param string $status
     * @param bool $paid
     * @return void
     */
    public function assignAttendee($user, $eventOwner = false, $status = 'attending', $paid = true)
    {
        $this->attendees()->attach($user, compact('eventOwner','$status','paid'));
    }

    /**
     * Remove a user.
     *
     * @param  $user
     * @return  mixed
     */
    public function removeAttendee($user)
    {
        return $this->attendees()->detach($user);
    }

    /**
     * Optional FullCalendar.io settings for this event
     *
     * @return array
     */
    public function getEventOptions()
    {
        return [
            'url' => url('event/'.$this->id)
        ];
    }
}
