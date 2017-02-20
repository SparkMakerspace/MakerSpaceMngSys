<?php

namespace App\Http\Controllers;

use App\Post;
use Illuminate\Http\Request;

class CalendarController extends Controller
{
    public function show(){
        $widgets = [];
        array_push($widgets,\View::make('partials.Comments',['commentable'=>$post])->render());
        array_push($widgets,\View::make('post.create')->render());
        \View::make('test')->with(compact('widgets'));
    }
}
