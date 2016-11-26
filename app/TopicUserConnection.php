<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * Class TopicUserConnection
 * @package App
 */
class TopicUserConnection extends Model
{
    /**
     * @var string
     */
    protected $table = 'topics_users';

    protected $fillable = ['topic_id','user_id','is_lead'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function topic()
    {
        return $this->belongsTo('App\Topic');
    }
}
