<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Sitenavigation
 *
 * @property int $id
 * @property string $LinkText
 * @property string $LinkImage
 * @property string $LinkLoginReqd
 * @property string $LinkURL
 * @property string $LinkDescription
 * @property string|null $PageTitle
 * @property string|null $PageContent
 * @property string|null $PagePublishDate
 * @property string|null $PageStub
 * @property string|null $PageCSS
 * @property string|null $PageJavaScript
 * @property string|null $PageKeywords
 * @property \Carbon\Carbon|null $created_at
 * @property \Carbon\Carbon|null $updated_at
 * @property \Carbon\Carbon|null $deleted_at
 * @method static bool|null forceDelete()
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation onlyTrashed()
 * @method static bool|null restore()
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereLinkDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereLinkImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereLinkLoginReqd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereLinkText($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereLinkURL($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation wherePageCSS($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation wherePageContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation wherePageJavaScript($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation wherePageKeywords($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation wherePagePublishDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation wherePageStub($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation wherePageTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|\App\Sitenavigation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation withTrashed()
 * @method static \Illuminate\Database\Query\Builder|\App\Sitenavigation withoutTrashed()
 * @mixin \Eloquent
 */
class Sitenavigation extends Model
{
	
	use SoftDeletes;

	protected $dates = ['deleted_at'];
    
	
    protected $table = 'Sitenavigations';

	
}
