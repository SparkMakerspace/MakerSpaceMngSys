<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Sitenavigation.
 *
 * @author The scaffold-interface created at 2017-03-16 12:59:53am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $LinkText
 * @property string $LinkImage
 * @property string $LinkLoginReqd
 * @property string $LinkURL
 * @property string $LinkDescription
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereLinkText($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereLinkImage($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereLinkLoginReqd($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereLinkURL($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereLinkDescription($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Sitenavigation extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'sitenavigations';

	
}
