<?php

namespace App\Http\Controllers;

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
        return view('dashboard.home');
    }

    public function acctMgmt()
    {
        $user = \Auth::user();
        $groups = $user->groups;
        return view('dashboard.acctMgmt')->with(compact('user'))->with(compact('groups'));
    }
}
