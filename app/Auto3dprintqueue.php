<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Auto3dprintqueue.
 *
 * @author The scaffold-interface created at 2017-03-14 06:02:31am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $Name
 * @property string $Path
 * @property int $Infill
 * @property string $Status
 * @property bool $Notified
 * @property int $auto3dprintercolor_id
 * @property int $auto3dprintmaterial_id
 * @property int $user_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @property-read \App\Auto3dprintercolor $auto3dprintercolor
 * @property-read \App\Auto3dprintmaterial $auto3dprintmaterial
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue wherePath($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereInfill($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereStatus($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereNotified($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereAuto3dprintercolorId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereAuto3dprintmaterialId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintqueue whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Auto3dprintqueue extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'auto3dprintqueues';

	


	
	public function auto3dprintmaterial()
	{
		return $this->belongsTo('App\Auto3dprintmaterial','auto3dprintmaterial_id');
	}

	
	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}

	
}
