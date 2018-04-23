<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class EventTypeController extends Controller
{
    public function create()
    {
        return $this->edit(null);
    }

    public function store($request)
    {
        //
    }

    public function edit($eventType)
    {
        return view('event.type.edit', compact('title','eventType'));   
    }
}