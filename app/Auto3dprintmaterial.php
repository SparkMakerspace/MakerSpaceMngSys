<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Auto3dprintmaterial.
 *
 * @author The scaffold-interface created at 2017-03-14 05:49:10am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $material
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintmaterial whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintmaterial whereMaterial($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintmaterial whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintmaterial whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Auto3dprintmaterial whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Auto3dprintmaterial extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'auto3dprintmaterials';

	
}
