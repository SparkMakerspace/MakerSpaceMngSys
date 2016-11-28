<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Post
 *
 * @property-read \App\User $owner
 * @mixin \Eloquent
 * @property integer $id
 * @property string $title
 * @property string $body
 * @property integer $user_id
 * @property string $post_time
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereTitle($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereBody($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post wherePostTime($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereUpdatedAt($value)
 * @property string $deleted_at
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Query\Builder|\App\Post whereDeletedAt($value)
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Workstation[] $workstations
 */
class Post extends Model
{
    /**
     * @var array
     */
    protected $dates = [
        'post_time',
        'created_at',
        'updated_at'
    ];

    /**
     * @var string
     */
    protected $table = 'posts';

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
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function workstations()
    {
        return $this->morphToMany('App\Workstation','connection')
            ->withTimestamps();
    }

    /**
     * @return bool
     */
    public function userExists()
    {
        return !is_null($this->user);
    }


}
