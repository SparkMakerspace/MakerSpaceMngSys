<?php

namespace App\Http\Controllers;

use FullCal;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Calendar;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class CalendarController.
 *
 * @author  The scaffold-interface created at 2017-01-23 03:49:14am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class CalendarController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - calendar';
        $calendars = Calendar::paginate(6);
        return view('calendar.index',compact('calendars','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - calendar';
        
        return view('calendar.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $calendar = new Calendar();

        
        $calendar->name = $request->name;

        
        
        $calendar->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new calendar has been created !!']);

        return redirect('calendar');
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
        $title = 'Show - calendar';

        if($request->ajax())
        {
            return URL::to('calendar/'.$id);
        }

        $events = [];

        $events[] = FullCal::event(
            'Event One', //event title
            false, //full day event?
            '2017-01-11T0800', //start time (you can also use Carbon instead of DateTime)
            '2017-01-11T0800', //end time (you can also use Carbon instead of DateTime)
            0 //optionally, you can specify an event ID
        );

        $calendar = FullCal::addEvents($events);

        return view('calendar.show',compact('title','calendar'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - calendar';
        if($request->ajax())
        {
            return URL::to('calendar/'. $id . '/edit');
        }

        
        $calendar = Calendar::findOrfail($id);
        return view('calendar.edit',compact('title','calendar'  ));
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
        $calendar = Calendar::findOrfail($id);
    	
        $calendar->name = $request->name;
        
        
        $calendar->save();

        return redirect('calendar');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/calendar/'. $id . '/delete');

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
     	$calendar = Calendar::findOrfail($id);
     	$calendar->delete();
        return URL::to('calendar');
    }
}
