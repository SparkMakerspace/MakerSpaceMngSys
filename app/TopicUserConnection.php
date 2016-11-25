<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TopicUserConnection extends Model
{
    protected $table = 'topics_users';

    public function user()
    {
        return $this->belongsTo('App\User','user_id');
    }

    public function topic()
    {
        return $this->belongsTo('App\Topic','topic_id');
    }
}
