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
 */
class Workstation extends Model
{
    /**
     * @var string
     */
    protected $table = 'workstations';

    /**
     *
     */
    public function users()
    {
        return $this->morphedByMany('App\User','connection')->withPivot('permissionLevel');
    }

    public function posts()
    {
        return $this->morphedByMany('App\Post','connection');
    }
}
