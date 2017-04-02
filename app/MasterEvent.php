<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\MasterEvent
 *
 * @property int $id
 * @property string $name
 * @property string $startDateTime
 * @property string $endDateTime
 * @property string $description
 * @property bool $allDay
 * @property string $type
 * @property bool $nonMembersAllowed
 * @property float $materialCostPerAttendee
 * @property float $percentCostToSpark
 * @property float $memberTicketPrice
 * @property float $additionalNonMemberTicketPrice
 * @property int $maxAttendance
 * @property int $memberAttendees
 * @property int $nonMemberAttendees
 * @property int $image_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\MasterEvent[] $masterEventChildren
 * @property-read \App\MasterEvent $masterEventParent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Group[] $groups
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @property-read \App\Image $image
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereStartDateTime($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereEndDateTime($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereDescription($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereAllDay($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereNonMembersAllowed($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereMaterialCostPerAttendee($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent wherePercentCostToSpark($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereMemberTicketPrice($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereAdditionalNonMemberTicketPrice($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereMaxAttendance($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereMemberAttendees($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereNonMemberAttendees($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereImageId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereDeletedAt($value)
 * @mixin \Eloquent
 * @property string $status
 * @property string $duration
 * @property int $primaryMasterEventId
 * @property float $percentRevenueToSpark
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereStatus($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent whereDuration($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent wherePrimaryMasterEventId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\MasterEvent wherePercentRevenueToSpark($value)
 */
class MasterEvent extends Model
{
    use Commentable;
    use HasImage;
    use SoftDeletes;

    protected $table = 'masterevents';

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users() {
        return $this->belongsToMany('App\User','masterevents_users')->withPivot(['role']);
    }

    /**
     * @return mixed
     */
    public function owner() {
        return $this->users()->wherePivot('role','=','owner')->first();
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

    public function masterEventChildren(){
        return $this->hasMany('App\MasterEvent','primaryMasterEventId');
    }

    public function masterEventParent(){
        return $this->belongsTo('App\MasterEvent','primaryMasterEventId');
    }

    /**
     * Get the start time
     *
         * @return DateTime
     */
    public function getDuration(){
        return $this->duration;
    }

    /**
     * group.
     *
     * @return  \Illuminate\Support\Collection;
     */
    public function groups()
    {
        return $this->belongsToMany('App\Group','groups_masterevents');
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
