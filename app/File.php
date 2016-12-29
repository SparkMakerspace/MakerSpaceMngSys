<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * App\File
 *
 * @property integer $id
 * @property string $filename
 * @property mixed $data
 * @method static \Illuminate\Database\Query\Builder|\App\File whereId($value)
 * @method static \Illuminate\Database\Query\Builder|\App\File whereFilename($value)
 * @method static \Illuminate\Database\Query\Builder|\App\File whereData($value)
 * @mixin \Eloquent
 */
class File extends Model
{
    public $timestamps = false;
    protected $guarded = [];
}
