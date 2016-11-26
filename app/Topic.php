<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class Topic
 * @package App
 */
class Topic extends Model
{
    /**
     * @var string
     */
    protected $table = 'topics';

    /**
     *
     */
    public function userConnections()
    {
        return $this->hasMany('App\TopicUserConnection');
    }
}
