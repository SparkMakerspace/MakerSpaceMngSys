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
 * @property string $name
 * @property string $description
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Comment[] $comments
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereName($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereDescription($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereCreatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|\App\Image whereUpdatedAt($value)
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

    public function imageTag()
    {
        return '<img src="'.$this->path.'">';
    }

    public function comments()
    {
        return $this->morphMany('App\Comment','commentable');
    }
    
}
