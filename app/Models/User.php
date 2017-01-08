<?php

namespace App\Models;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

/**
 * @SWG\Definition(
 *      definition="User",
 *      required={"name", "username", "email", "phone", "streetAddress", "cityAddress", "stateAddress", "zipAddress", "contactPref", "role", "active"},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="name",
 *          description="name",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="username",
 *          description="username",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="email",
 *          description="email",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="phone",
 *          description="phone",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="cityAddress",
 *          description="cityAddress",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="stateAddress",
 *          description="stateAddress",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="zipAddress",
 *          description="zipAddress",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="contactPref",
 *          description="contactPref",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="keyCard",
 *          description="keyCard",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="role",
 *          description="role",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="active",
 *          description="active",
 *          type="boolean"
 *      ),
 *      @SWG\Property(
 *          property="password",
 *          description="password",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="created_at",
 *          description="created_at",
 *          type="string",
 *          format="date-time"
 *      ),
 *      @SWG\Property(
 *          property="updated_at",
 *          description="updated_at",
 *          type="string",
 *          format="date-time"
 *      )
 * )
 */
class User extends Authenticatable
{
    use Notifiable;
    use SoftDeletes;

    public $table = 'users';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'name',
        'username',
        'email',
        'phone',
        'streetAddress',
        'streetAddress2',
        'cityAddress',
        'stateAddress',
        'zipAddress',
        'contactPref',
        'keyCard',
        'role',
        'active',
        'password'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'name' => 'string',
        'username' => 'string',
        'email' => 'string',
        'phone' => 'string',
        'cityAddress' => 'string',
        'stateAddress' => 'string',
        'zipAddress' => 'integer',
        'contactPref' => 'string',
        'keyCard' => 'string',
        'role' => 'string',
        'active' => 'boolean',
        'password' => 'string'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'name' => 'required',
        'username' => 'required,unique,min:5',
        'email' => 'required,unique,email',
        'phone' => ['required','regex'=>'\(?[1-9]{1}[0-9]{2}\)?\-?[0-9]{3}\-?[0-9]{4})'],
        'streetAddress' => 'required|regex:[0-9]+ [A-Za-z0-9\s]+',
        'cityAddress' => 'required|regex:[A-Za-z]+',
        'stateAddress' => 'required|max:2|min:2',
        'zipAddress' => 'required|min:0|max:99999',
        'contactPref' => 'required',
        'role' => 'required',
        'active' => 'required'
    ];

    
}
