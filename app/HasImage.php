<?php

namespace App;

trait HasImage
{
    public function image()
    {
        return $this->belongsTo('App\Image');
    }
}