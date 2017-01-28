<?php

namespace App\Http\Controllers;

use App\Event;
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
     * Display the specified resource.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function show(Request $request)
    {
        $title = 'Show - calendar';

        if($request->ajax())
        {
            return URL::to('calendar/');
        }

        $calendar = FullCal::setId('1');

        if(Event::first()) {
            $calendar = FullCal::addEvent(Event::first());
        }


        return view('calendar.show',compact('title','calendar'));
    }

}
