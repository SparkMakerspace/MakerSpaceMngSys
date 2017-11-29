<?php

namespace App;

trait Commentable
{
    public function comments()
    {
        return $this->morphMany('App\Comment','commentable');
    }
}