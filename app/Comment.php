<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Comment
 */
class Comment extends Model
{
    protected $table = 'comments';

    public $timestamps = true;

    protected $fillable = [
        'body',
        'user_id'
    ];

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

        
}