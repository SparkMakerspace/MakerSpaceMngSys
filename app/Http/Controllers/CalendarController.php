<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function show(){
        $widgets = [];
        array_push($widgets,\View::make('group.create')->render());
        array_push($widgets,\View::make('post.create')->render());
        $widgetListView = \View::make('test')->with(compact('widgets'));
        return $widgetListView;
    }
}
