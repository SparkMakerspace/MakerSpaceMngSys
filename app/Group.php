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

    public function save(array $options = [])
    {
        if (is_null($this->image_id)){
            $this->image_id = Image::whereName('groupNoImage.svg')->first()->id;
        }
        return parent::save($options);
    }

    public function posts()
    {
        return $this->belongsToMany('App\Post','groups_posts');
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

    public function users()
    {
        return $this->belongsToMany('App\User','groups_users')->withPivot('role');
    }

    public function leads()
    {
        return $this->belongsToMany('App\User','groups_users')->wherePivot('role', '=','LEAD');
    }

    public function members()
    {
        return $this->belongsToMany('App\User','groups_users')->withPivot('role');
    }


    public function ismember($user)
    {
        if ($this->users()->find($user)) {
            return TRUE;
        }
        return false;
    }

    public function islead($user)
    {



        if ($this->leads->find($user) !=null)
        {
            return TRUE;
        }
        return false;
    }

    public function assignMember($user)
    {
        if ($this->users()->find($user)) {
            return $this->users()->detach($user);
        }
        return $this->users()->attach($user,['role'=>'MEMBER']);
    }

    public function assignLead($user)
    {
        if ($this->users()->find($user)) {
            return $this->users()->detach($user);
        }
        return $this->users()->attach($user,['role'=>'LEAD']);
    }

    public function removeUser($user)
    {
        if ($this->users()->find($user)) {
            $this->users()->detach($user);
        }
    }
}
