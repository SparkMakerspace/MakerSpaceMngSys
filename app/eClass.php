<?php

namespace App;

class eClass extends Event
{
    public function instructor(){
        return $this->belongsTo('App\User');
    }

    public function save(array $options = [])
    {
        $this->type = 'class';
        return parent::save($options);
    }
}
