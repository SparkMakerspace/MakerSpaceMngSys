<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function show(){
        $widgets = [];
        array_push($widgets,\View::make('group.create',['type'=>'App/Post','id'=>2])->render());
        array_push($widgets,\View::make('post.create')->render());
        \View::make('test')->with(compact('widgets'));
    }
}
