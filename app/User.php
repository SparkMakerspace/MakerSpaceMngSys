<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;


/**
 * App\User
 *
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Group[] $groups
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Role[] $roles
 * @property-read \Illuminate\Database\Eloquent\Collection|\Spatie\Permission\Models\Permission[] $permissions
 * @method static \Illuminate\Database\Query\Builder|\App\User role($roles)
 * @mixin \Eloquent
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string $password
 * @property string $remember_token
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereUpdatedAt($value)
 * @property string $address1
 * @property string $address2
 * @property string $city
 * @property string $state
 * @property string $zipcode
 * @property string $phone
 * @property bool $active
 * @property string $paidThrough
 * @property string $accountType
 * @property string $bio
 * @property string $image
 * @method static \Illuminate\Database\Query\Builder|\App\User whereAddress1($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereAddress2($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCity($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereState($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereZipcode($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePhone($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereActive($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePaidThrough($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereAccountType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereBio($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereImage($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Event[] $events
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Post[] $posts
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Door[] $doors
 * @property string $username
 * @property int $image_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @method static \Illuminate\Database\Query\Builder|\App\User whereUsername($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereImageId($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Chore_list[] $chore_lists
 * @property string|null $signature
 * @property int|null $contractRev
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereContractRev($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\User whereSignature($value)
 */
class User extends Authenticatable
{
    use HasImage;
    use Notifiable;


    /**
     * The attributes that are not mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    /**
     * The attributes that should be visible in serialization.
     *
     * @var array
     */
    protected $visible = ['id','username','name','accountType','bio'];

    public function UserUrl()
    {
        return url('u/' .$this->username);
    }

    public function payment_tokens(){
        return $this->hasMany('App\Payment_token');
    }

    public function selected_payment(){
        return $this->payment_tokens()->where('selected',1);
    }

    /**
     * group.
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany ;
     */
    public function groups()
    {
        return $this->belongsToMany('App\Group','groups_users')->withPivot('role');
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
     * event.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function events()
    {
        return $this->belongsToMany('App\Event','events_users')->withPivot(['eventOwner','status','paid']);
    }

    /**
     * Assign a event.
     *
     * @param  $event
     * @return  mixed
     */
    public function assignEvent($event)
    {
        return $this->events()->attach($event);
    }

    /**
     * Remove a event.
     *
     * @param  $event
     * @return  mixed
     */
    public function removeEvent($event)
    {
        return $this->events()->detach($event);
    }


    /**
     * post.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function posts()
    {
        return $this->belongsToMany('App\Post','posts_users')->withPivot('postOwner');
    }

    /**
     * Assign a post.
     *
     * @param  $post
     * @return  mixed
     */
    public function assignPost($post)
    {
        return $this->posts()->attach($post);
    }

    /**
     * Remove a post.
     *
     * @param  $post
     * @return  mixed
     */
    public function removePost($post)
    {
        return $this->posts()->detach($post);
    }

    /**
     * door.
     *
     * @return  \Illuminate\Support\Collection;
     */
    public function doors()
    {
        return $this->belongsToMany('App\Door');
    }

    /**
     * Assign a door.
     *
     * @param  $door
     * @return  mixed
     */
    public function assignDoor($door)
    {
        return $this->doors()->attach($door);
    }

    /**
     * Remove a door.
     *
     * @param  $door
     * @return  mixed
     */
    public function removeDoor($door)
    {
        return $this->doors()->detach($door);
    }

    public function comments()
    {
        return $this->hasMany('App\Comment');
    }

    public function save(array $options = [])
    {
        if (is_null($this->image_id)){
            $this->image_id = Image::whereName('userNoImage.svg')->first()->id;
        }
        return parent::save($options);
    }

    public function accessMediasAll()
    {
        // return true for access to all medias
        return $this->hasAnyRole(['admin','superadmin']);
    }

    public function accessMediasFolder()
    {
        // return true for access to one folder
        return $this->hasAnyRole('nonmember');
    }


    /**
     * chore_list.
     *
     * @return  \Illuminate\Support\Collection;
     */
    public function chore_lists()
    {
        return $this->belongsToMany('App\Chore_list');
    }

    /**
     * Assign a chore_list.
     *
     * @param  $chore_list
     * @return  mixed
     */
    public function assignChore_list($chore_list)
    {
        return $this->chore_lists()->attach($chore_list);
    }
    /**
     * Remove a chore_list.
     *
     * @param  $chore_list
     * @return  mixed
     */
    public function removeChore_list($chore_list)
    {
        return $this->chore_lists()->detach($chore_list);
    }





}


