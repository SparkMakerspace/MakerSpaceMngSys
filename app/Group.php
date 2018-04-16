<?php

namespace App;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Group.
 *
 * @author The scaffold-interface created at 2017-01-18 02:37:47am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $name
 * @property string $stub
 * @property string $about
 * @property string $image
 * @property int $contactUser
 * @property string $visibility
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereStub($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereAbout($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereImage($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereContactUser($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereVisibility($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereDeletedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Event[] $events
 * @property int $image_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereImageId($value)
 * @property int $user_id
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereUserId($value)
 * @property string $contactInfo
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Post[] $posts
 * @method static \Illuminate\Database\Query\Builder|\App\Group whereContactInfo($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\MasterEvent[] $masterEvents
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 */
class Group extends Model
{
    use Commentable;
    use HasImage;
	use SoftDeletes;

	protected $guarded = [];
	protected $dates = ['deleted_at'];
    
	
    protected $table = 'groups';

    /**
     * Groups have multiple events
     * 
     * @return mixed
     */
    public function events()
    {
        return $this->belongsToMany('App\Event','events_groups');
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
     * Override the save function so give new groups a default image
     * 
     * @param  array  $options
     * @return bool   whatever the save function normally does...
     */
    public function save(array $options = [])
    {
        if (is_null($this->image_id)){
            $this->image_id = Image::whereName('groupNoImage.svg')->first()->id;
        }
        return parent::save($options);
    }

    /**
     * Groups have multiple posts
     * 
     * @return mixed
     */
    public function posts()
    {
        return $this->belongsToMany('App\Post','groups_posts');
    }

    /**
     * Assign a post.
     *
     * @param  Post $post
     * @return  mixed
     */
    public function assignPost(Post $post)
    {
        return $this->posts()->attach($post);
    }

    /**
     * Remove a post.
     *
     * @param  Post $post
     * @return  mixed
     */
    public function removePost(Post $post)
    {
        return $this->posts()->detach($post);
    }

    /**
     * Groups have many users
     * 
     * @return mixed
     */
    public function users()
    {
        return $this->belongsToMany('App\User','groups_users')->withPivot('role');
    }

    /**
     * Groups have many leads (which are secretly just users with the LEAD role)
     * 
     * @return mixed
     */
    public function leads()
    {
        return $this->belongsToMany('App\User','groups_users')->wherePivot('role', '=','lead');
    }

    /**
     * Groups have many members (which are secretly users with the MEMBER role)
     * 
     * @return mixed
     */
    public function members()
    {
        return $this->belongsToMany('App\User','groups_users')->wherePivot('role','=','member');
    }

    /**
     * Returns true if the given user is a general member of the group
     * 
     * @param  User   $user
     * @return bool
     */
    public function isMember(User $user)
    {
        if ($this->members()->find($user)) {
            return true;
        }
        return false;
    }

    /**
     * Returns true if the given user is a lead of the group
     * 
     * @param  User   $user
     * @return bool
     */
    public function isLead(User $user)
    {
        if ($this->leads->find($user) !=null)
        {
            return true;
        }
        return false;
    }

    /**
     * Returns true if the given user is a user of the group (member or lead)
     * 
     * @param  User   $user
     * @return string
     */
    public function isUser(User $user)
    {
        $tmp = $this->users->find($user);
        if ($tmp !=null)
        {
            return $tmp->pivot->role;
        }
        return false;
    }

    /**
     * assignMember makes the given user a member of the group (forcefully)
     * 
     * @param  User   $user
     * @return void
     */
    public function assignMember(User $user)
    {
        if ($this->isUser($user)) {
            $this->users()->detach($user);
        }
        $this->users()->attach($user,['role'=>'member']);
    }

    /**
     * assignLead makes the given user a lead of the group (forcefully)
     * 
     * @param  User   $user 
     * @return void
     */
    public function assignLead(User $user)
    {
        if ($this->users()->find($user)) {
            $this->users()->detach($user);
        }
        $this->users()->attach($user,['role'=>'lead']);
    }

    /**
     * Remove the user from the group
     * 
     * @param  User   $user
     * @return void
     */
    public function removeUser(User $user)
    {
        if ($this->users()->find($user)) {
            $this->users()->detach($user);
        }
    }

    /**
     * Returns the built-in Admin group
     * @return [type] [description]
     */
    static public function getAdminGroup()
    {
        return Group::whereStub("Admin")->first();
    }

    /**
     * Returns the built-in Admin group
     * @return [type] [description]
     */
    static public function getCalAdminGroup()
    {
        return Group::whereStub("CalAdmin")->first();
    }
}
