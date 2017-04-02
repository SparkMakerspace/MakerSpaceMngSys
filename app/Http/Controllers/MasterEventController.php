<?php

namespace App\Http\Controllers;

use App\MasterEvent;
use Illuminate\Http\Request;

class MasterEventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - event';
        $events = MasterEvent::paginate(6);
        $calendar = \FullCal::addEvents($events)->setCallbacks([
            'eventClick'=> 'function(calEvent, jsEvent, view) {
        window.location.assign(calEvent.url);
    }'])->setOptions([
            'defaultView'=>'month',
            'header'=>['left'=>'title','center'=>'','right'=>'today prev,next'],
        ]);
        return view('masterEvent.index',compact('events','title','calendar'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - event';

        return view('masterEvent.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = new MasterEvent();

        $event->name = $request->name;

        if ($request->allDay){
            $event->duration = '24:00:00';
        }else {
            $event->duration = $request->duration;
        }

        $event->description = $request->description;

        $event->allDay = ($request->allDay) ? true : false;

        $event->save();

        $event->groups()->sync($request->group);

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
            'test-event',
            ['message' => 'A new event has been created !!']);

        return redirect('event/master');
    }

    /**
     * Display the specified resource.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function show($id,Request $request)
    {
        $title = 'Show - event';

        if($request->ajax())
        {
            return URL::to('event/master/'.$id);
        }

        $event = MasterEvent::findOrfail($id);
        return view('masterEvent.show',compact('title','event'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - event';
        if($request->ajax())
        {
            return URL::to('event/master/'. $id . '/edit');
        }


        $event = MasterEvent::findOrfail($id);
        return view('masterEvent.edit',compact('title','event'  ));
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
        $event = MasterEvent::findOrfail($id);

        $event->name = $request->name;

        if ($request->allDay){
            $event->duration = '24:00:00';
        }else {
            $event->duration = $request->duration;
        }

        $event->description = $request->description;

        $event->allDay = ($request->allDay) ? true : false;

        $event->save();

        $event->groups()->sync($request->group);

        return redirect('event/master');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/event/master/'. $id . '/delete');

        if($request->ajax())
        {
            return $msg;
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $event = MasterEvent::findOrfail($id);
        $event->delete();
        return URL::to('event/master');
    }
}
