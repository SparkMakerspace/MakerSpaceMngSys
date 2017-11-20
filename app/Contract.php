<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Contract.
 *
 * @author The scaffold-interface created at 2017-11-19 09:43:39pm
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $text
 * @property string $revision
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Contract onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contract whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contract whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contract whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contract whereRevision($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contract whereText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Contract whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Contract withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Contract withoutTrashed()
 * @mixin \Eloquent
 */
class Contract extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'contracts';

	
}
