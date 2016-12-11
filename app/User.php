<?php

namespace App;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;


/**
 * App\User
 *
 * @property integer $id
 * @property string $name
 * @property string $username
 * @property string $email
 * @property string $keyCard
 * @property string $publicKey
 * @property string $role
 * @property boolean $active
 * @property string $password
 * @property string $creditCardToken
 * @property string $remember_token
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Post[] $posts
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Workstation[] $workstations
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Door[] $doors
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $readNotifications
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $unreadNotifications
 * @method static \Illuminate\Database\Query\Builder|\App\User whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereUsername($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereEmail($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereKeyCard($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePublicKey($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereRole($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereActive($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePassword($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCreditCardToken($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereRememberToken($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereDeletedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Group[] $groups
 * @property string $hash_method
 * @method static \Illuminate\Database\Query\Builder|\App\User whereHashMethod($value)
 * @property string $phone
 * @property string $address
 * @property string $contactPref
 * @method static \Illuminate\Database\Query\Builder|\App\User wherePhone($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereAddress($value)
 * @method static \Illuminate\Database\Query\Builder|\App\User whereContactPref($value)
 */
class User extends Authenticatable
{
    use SoftDeletes;
    use Notifiable;

    /**
     * Define which table the User model is associated with.
     * 
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'role', 'password', 'remember_token', 'creditCardToken', 'keyCard'
    ];

    /**
     * The master list of defined global user roles.
     * 
     * @var array
     */
    public static $roles = ['user', 'admin'];

    /**
     * Defines the relationship: A user has many posts.
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    /**
     * Defines the relationship: A user has many 
     * 
     * @return \Illuminate\Database\Eloquent\Relations\MorphToMany
     */
    public function groups()
    {
        return $this->belongsToMany('App\Group')
            ->withPivot('permissionLevel')
            ->withTimestamps();
    }

    public function doors()
    {
        return $this->belongsToMany('App\Door','door_access')
            ->withPivot('allHoursAccess')->withTimestamps();
    }

    /**
     * @param string $role
     * @return bool
     */
    public function hasRole(string $role)
    {
        return $this->role === $role;
    }

    /**
     * @return array
     */
    public static function getRoles()
    {
        return self::$roles;
    }

    public function isActive()
    {
        return $this->active;
    }
}
