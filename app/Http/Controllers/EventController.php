<?php

namespace App\Http\Controllers;

use App\Calendar;
use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Event;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class EventController.
 *
 * @author  The scaffold-interface created at 2017-01-24 02:17:15am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $title = 'Index - event';
        if ($request->query('past')) {
            $events = Event::orderBy('startDateTime','des')
                ->where('startDateTime', '<', Carbon::today())
                ->paginate(10);
        } else {
            $events = Event::orderBy('startDateTime')
                ->where('startDateTime', '>', Carbon::today())
                ->paginate(10);
        }
        $calendar = \FullCal::addEvents($events)->setCallbacks([
            'eventClick'=> 'function(calEvent, jsEvent, view) {
        window.location.assign(calEvent.url);
    }'])->setOptions([
            'defaultView'=>'month',
//            'header'=>['left'=>'title','center'=>'','right'=>'today prev,next'],
        ]);
        return view('event.index',compact('events','title','calendar'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - event';
        
        return view('event.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $event = new Event();

        
        $event->name = $request->name;

        if ($request->allDay){
            $event->startDateTime = $request->startDateTime.' 00:00:00';
        }else {
            $event->startDateTime = $request->startDateTime.':00';
        }

        if ($request->allDay) {
            $event->endDateTime = $request->endDateTime.' 23:59:00';
        } else {
            $event->endDateTime = $request->endDateTime.':00';
        }

        $event->description = $request->description;

        $event->allDay = ($request->allDay) ? true : false;

        $event->save();

        $event->groups()->sync($request->group);

        $event->attendees()->attach(\Auth::id(),['eventOwner'=>'1']);


        return redirect('event');
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
            return URL::to('event/'.$id);
        }

        $event = Event::findOrfail($id);
        return view('event.show',compact('title','event'));
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
            return URL::to('event/'. $id . '/edit');
        }

        
        $event = Event::findOrfail($id);
        return view('event.edit',compact('title','event'  ));
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
        $event = Event::findOrfail($id);

        $event->name = $request->name;

        if ($request->allDay){
            $event->startDateTime = $request->startDateTime.' 00:00:00';
        }else {
            $event->startDateTime = $request->startDateTime.':00';
        }

        if ($request->allDay) {
            $event->endDateTime = $request->endDateTime.' 23:59:00';
        } else {
            $event->endDateTime = $request->endDateTime.':00';
        }

        $event->description = $request->description;

        $event->allDay = ($request->allDay) ? true : false;

        $event->save();

        $event->groups()->sync($request->group);

        return redirect('event');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/event/'. $id . '/delete');

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
     	$event = Event::findOrfail($id);
     	$event->delete();
        return URL::to('event');
    }

    public function myEvents()
    {
        $events = \Auth::user()->events()->wherePivot('EventOwner','=',1)->get()
            ->sortBy('startDateTime')
            ->where('startDateTime','>',Carbon::today()->addMonths(-6))
            ->where('startDateTime','<',Carbon::today()->addMonths(12))
            ->all();

        return view('event.myEvents',compact('events'));
    }
}
