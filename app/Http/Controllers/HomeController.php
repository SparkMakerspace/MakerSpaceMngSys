<?php

namespace App\Http\Controllers;

use App\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $topicConnections = User::with([
                'topicConnections',
                'topicConnections.topic'
            ])->whereId(\Auth::user()->id)->first();
//        return $topicConnections;
        return view('dashboard.home')->with(compact('topicConnections'));
    }
}
