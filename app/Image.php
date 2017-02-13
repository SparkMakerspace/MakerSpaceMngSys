<?php

namespace App;

use Eloquent as Model;
use Illuminate\Database\Eloquent\SoftDeletes;


/**
 * App\Image
 *
 * @property int $id
 * @property string $originalname
 * @property int $size
 * @property string $path
 * @property string $user_id
 * @property \Carbon\Carbon $deleted_at
 * @property-read \App\User $user
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereOriginalname($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereSize($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Image wherePath($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereDeletedAt($value)
 * @mixin \Eloquent
 */
class Image extends Model
{
    use SoftDeletes;

    public $table = 'images';

    protected $dates = ['deleted_at'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    
}
