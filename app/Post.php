<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Helpers\Strings;

/**
 * Class Post.
 *
 * @author The scaffold-interface created at 2017-01-18 02:52:09am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $posted_at
 * @property string $title
 * @property string $body
 * @property string $image
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post wherePostedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereTitle($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereBody($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereImage($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereDeletedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @property int $image_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereImageId($value)
 */
class Post extends Model
{
    use HasImage;
    use Commentable;
    use SoftDeletes;

    protected $dates = ['deleted_at'];

    protected $table = 'posts';

    protected $break = '!!BREAK!!';

    protected $excerptLength = 50;

    /**
     * Get the excerpt for the post
     *
     * @return mixed|string
     */
    public function getExcerpt()
    {
        // fetch the text in the body of the post
        $body = $this->body;

        $readMore = ' ... <a href="'.route('post.show', [$this->id]).'">READ MORE</a>';

        // look for the break string - if it exists, set the excerpt as everything
        // up until the break string. Otherwise, just use the first $excerptLength words

        if (str_contains($body,$this->break))
        {
            $excerpt = strstr($body, $this->break,true);
            $excerpt = $excerpt.$readMore;
        }
        else {
            $excerpt = Strings::shorten_string($body,$this->excerptLength);

            // If the excerpt has fewer than $excerptLength words, make sure the READ MORE string is placed within the <p> tags.
            if(strrpos($excerpt,'</p>') == (strlen($excerpt)-4)){
                $excerpt = substr_replace($excerpt, $readMore, strlen($excerpt)-4, 0);
            }
            else
            {
                $excerpt = $excerpt.$readMore;
            }
        }

        // Now append the 'read more' link

        return $excerpt;
    }

    /**
     * user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function users()
    {
        return $this->belongsToMany('App\User','posts_users')->withPivot(['postOwner']);
    }

    /**
     * returns the owner of the post
     *
     * @return Model|static
     */
    public function getOwner()
    {
        return $this->users()->wherePivot('postOwner','=','1')->firstOrFail();
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

    /**
     * group.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function groups()
    {
        return $this->belongsToMany('App\Group','groups_posts');
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
     * @return string
     */
    public function getBody()
    {
        $body = $this->body;
        return str_replace($this->break,'',$body);
    }

}
