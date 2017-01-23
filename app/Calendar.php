<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Calendar.
 *
 * @author The scaffold-interface created at 2017-01-23 03:49:14am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $name
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Calendar whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Calendar whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Calendar whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Calendar whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Calendar whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Calendar extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'calendars';

	
}
