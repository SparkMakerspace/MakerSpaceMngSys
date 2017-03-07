<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Group;
use Amranidev\Ajaxis\Ajaxis;
use URL;

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
        $groups = Group::paginate(6);
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
        $group = new Group();


        $group->name = $request->name;


        $group->stub = $request->stub;


        $group->about = $request->about;


        $group->image = $request->image;


        $group->contactUser = $request->contactUser;


        $group->visibility = $request->visibility;



        $group->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
            'test-event',
            ['message' => 'A new group has been created !!']);

        return redirect('g');
    }

    /**
     * Display the specified resource.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function show($stub,Request $request)
    {

        if($request->ajax())
        {
            return URL::to('g/'.$stub);
        }

        return $this->dashboard($stub);
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - group';
        if($request->ajax())
        {
            return URL::to('g/'. $id . '/edit');
        }


        $group = Group::findOrfail($id);
        return view('group.edit',compact('title','group'  ));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function update($id,Request $request)
    {
        $group = Group::findOrfail($id);

        $group->name = $request->name;

        $group->stub = $request->stub;

        $group->about = $request->about;

        $group->image = $request->image;

        $group->contactUser = $request->contactUser;

        $group->visibility = $request->visibility;


        $group->save();

        return redirect('g');
    }

    /**
     * Delete confirmation message by Ajaxis.
     *
     * @link      https://github.com/amranidev/ajaxis
     * @param    \Illuminate\Http\Request  $request
     * @return  String
     */
    public function DeleteMsg($id,Request $request)
    {
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/g/'. $id . '/delete');

        if($request->ajax())
        {
            return $msg;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param    int $id
     * @return \Illuminate\Http\Response|string
     */
    public function destroy($id)
    {
        $group = Group::findOrfail($id);
        $group->delete();
        return URL::to('g');
    }

    /**
     * Compile everything needed to display the group page
     *
     * @param    string $stub
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function
    dashboard($stub)
    {
        $group = Group::whereStub($stub)->first();
        $events = $group->events()->get();
        $calendar = \FullCal::addEvents($events)->setCallbacks([
            'eventClick'=> 'function(calEvent, jsEvent, view) {
        window.location.assign(calEvent.url);
    }'])->setOptions([
        'defaultView'=>'month',
            'header'=>['left'=>'title','center'=>'','right'=>'today prev,next'],
        ]);
        $posts = [];
        return view('group.dashboard')->with(compact('calendar','posts','group'));
    }
}
