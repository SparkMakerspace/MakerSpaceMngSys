<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Topic
 *
 * @package App
 * @property integer $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\SpaceConnection[] $userConnections
 * @method static \Illuminate\Database\Query\Builder|\App\Workstation whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Workstation whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Workstation whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Workstation whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\User[] $users
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Post[] $posts
 */
class Group extends Model
{
    /**
     * @var string
     */
    protected $table = 'groups';

    /**
     *
     */
    public function users()
    {
        return $this->belongsToMany('App\User')->withPivot('permissionLevel');
    }

    public function posts()
    {
        return $this->belongsToMany('App\Post');
    }
}
