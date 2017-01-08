<?php

namespace App\Models;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * App\Models\Post
 *
 * @SWG\Definition (
 *      definition="Post",
 *      required={"title", "body"},
 *      @SWG\Property(
 *          property="id",
 *          description="id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="image_id",
 *          description="image_id",
 *          type="integer",
 *          format="int32"
 *      ),
 *      @SWG\Property(
 *          property="title",
 *          description="title",
 *          type="string"
 *      ),
 *      @SWG\Property(
 *          property="owner_id",
 *          description="owner_id",
 *          type="integer",
 *          format="int32"
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
 * @property integer $id
 * @property integer $image_id
 * @property string $title
 * @property string $stub
 * @property string $body
 * @property integer $owner_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property \Carbon\Carbon $deleted_at
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereImageId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereTitle($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereStub($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereBody($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereOwnerId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Models\Post whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Post extends Model
{
    use SoftDeletes;

    public $table = 'posts';
    

    protected $dates = ['deleted_at'];


    public $fillable = [
        'owner_id',
        'image_id',
        'title',
        'stub',
        'body'
    ];

    /**
     * The attributes that should be casted to native types.
     *
     * @var array
     */
    protected $casts = [
        'image_id' => 'integer',
        'title' => 'string',
        'owner_id' => 'integer'
    ];

    /**
     * Validation rules
     *
     * @var array
     */
    public static $rules = [
        'title' => 'required',
        'body' => 'required'
    ];

    public static $breakString = '<p>==BREAK==</p>';

    /**
     * Strip out the break string from submitted body text
     * and then return the resulting $stub and the $body text in an array.
     *
     * @param string $submitted
     * @return array
     */
    public static function stripBodyText(string $submitted){
        $breakPos = strpos ($submitted, self::$breakString);
        if($breakPos) {
            $stub = substr($submitted, 0, $breakPos);
        } else {
            $stub = $submitted;
        }
        $body = str_replace(self::$breakString,'',$submitted);
        $body = str_replace('<p></p>','',$body);
        $body = str_replace('<p><br></p>','<br>',$body);
        return(['stub'=>$stub,'body'=>$body]);
    }
}
