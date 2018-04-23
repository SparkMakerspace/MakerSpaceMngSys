<?php

namespace App\Http\Controllers;

use Amranidev\Ajaxis\Ajaxis;
use App\Group;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\URL;

/**
 * Class GroupController.
 *
 * @author  The scaffold-interface created at 2017-01-18 02:37:47am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class GroupController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - group';
        $groups = Group::paginate(50);
        return view('group.index',compact('groups','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - group';

        return view('group.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $g = new Group();
        $g->name = $request->name;
        $g->stub = $request->stub;
        $g->about = $request->about;
        $g->image_id = $request->image;
        $g->visibility = $request->visibility;

        $g->save();

        return redirect('g/'.$g->stub);
    }

    /**
     * Display the specified resource.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function show(Group $g,Request $request)
    {
        if($request->ajax())
        {
            return URL::to('g/'.$g->stub);
        }

        return $this->dashboard($g);
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit(Group $g,Request $request)
    {
        $title = 'Edit - group';
        if($request->ajax())
        {
            return URL::to('g/'. $g->stub . '/edit');
        }
        return view('group.edit',compact('title','group'));
    }

    public function join(Group $g,Request $request)
    {
        $g -> assignMember(\Auth::user());
        return URL::to('g/'. $g->stub );
    }


    public function leave(Group $g,Request $request)
    {
        $g -> removeUser(\Auth::user());
        return URL::to('g/'. $g->stub );
    }
    /**
     * Update the specified resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    Group $g
     * @return  \Illuminate\Http\Response
     */
    public function update(Group $g,Request $request)
    {
        $g->name = $request->name;
        $g->stub = $request->stub;
        $g->about = $request->about;
        $g->image_id = $request->image;
        $g->visibility = $request->visibility;
        $g->save();

        return redirect('g');
    }

    /**
     * Delete confirmation message by Ajaxis.
     *
     * @link      https://github.com/amranidev/ajaxis
     * @param    \Illuminate\Http\Request   $request
     * @param    Group $g
     * @return  String
     */
    public function DeleteMsg(Group $g,Request $request)
    {
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/g/'. $g->stub . '/delete');

        if($request->ajax())
        {
            return $msg;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param   Group $g
     * @return  \Illuminate\Http\Response|string
     */
    public function destroy(Group $g)
    {
        $g->delete();
        return URL::to('g');
    }

    /**
     * Compile everything needed to display the group page
     *
     * @param    Group $g
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function dashboard(Group $g)
    {
        $group = $g;
        $events = $g->events()->get();
        $calendar = \FullCal::addEvents($events)->setCallbacks([
            'eventClick'=> 'function(calEvent, jsEvent, view) {
        window.location.assign(calEvent.url);
    }'])->setOptions([
            'defaultView'=>'month',
            'header'=>['left'=>'title','center'=>'','right'=>'today prev,next'],
        ]);
        $posts = $g->posts()->orderBy('created_at','dec')->paginate(10);
        return view('group.dashboard')->with(compact('calendar','posts','group'));
    }
}
