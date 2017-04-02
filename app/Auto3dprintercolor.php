<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Auto3dprintercolor.
 *
 * @author The scaffold-interface created at 2017-03-14 05:48:08am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $color
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintercolor whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintercolor whereColor($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintercolor whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintercolor whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintercolor whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Auto3dprintercolor extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'auto3dprintercolors';

	
}
