<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Resource.
 *
 * @author The scaffold-interface created at 2017-01-21 05:15:33am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $name
 * @property string $location
 * @property string $type
 * @property string $description
 * @property bool $requiresAuth
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereLocation($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereType($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereDescription($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereRequiresAuth($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Resource whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Resource extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'resources';

	
}
