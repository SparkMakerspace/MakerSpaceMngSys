<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Sitepage.
 *
 * @author The scaffold-interface created at 2017-03-16 01:15:50am
 * @link https://github.com/amranidev/scaffold-interface
 * @property int $id
 * @property string $PageTitle
 * @property string $PageContent
 * @property string $PagePublishDate
 * @property string $PageStub
 * @property string $PageCSS
 * @property string $PageJavaScript
 * @property string $PageKeywords
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage wherePageTitle($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage wherePageContent($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage wherePagePublishDate($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage wherePageStub($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage wherePageCSS($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage wherePageJavaScript($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage wherePageKeywords($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitepage whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Sitepage extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'sitepages';

	
}
