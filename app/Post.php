<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


/**
 * App\Post
 *
 * @property integer $id
 * @property string $title
 * @property string $body
 * @property integer $owner_id
 * @property \Carbon\Carbon $post_time
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property-read \App\User $owner
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Group[] $groups
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereTitle($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereBody($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereOwnerId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post wherePostTime($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Post extends Model
{
    use SoftDeletes;

    /**
     * @var array
     */
    protected $dates = [
        'post_time',
        'created_at',
        'updated_at'
    ];

    /**
     * @return array
     */
    public static function getValidationRules()
    {
        return array(
            'title' => 'required|max:140',
            'body' => 'required'
        );
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function owner()
    {
        return $this->belongsTo('App\User');
    }

    public function groups()
    {
        return $this->belongsToMany('App\Group')
            ->withTimestamps();
    }

    /**
     * @return bool
     */
    public function ownerExists()
    {
        return !is_null($this->owner);
    }


}
