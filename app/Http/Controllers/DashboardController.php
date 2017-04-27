<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Collection;

class DashboardController extends Controller
{
    public function show(){
        $user = \Auth::user();
        $title = 'Your Dashboard';
        $events = new Collection();
        foreach ($user->groups as $group){
            $events = $events->merge(
                $group->events()
                    ->get()
                    ->where('startDateTime', '>', Carbon::today()->addMonths(-1))
                    ->where('startDateTime','<',Carbon::today()->addYears(1)));
        }
        $events = $events->unique('id');

        $calendar = \FullCal::addEvents($events)->setCallbacks([
            'eventClick'=> 'function(calEvent, jsEvent, view) {
        window.location.assign(calEvent.url);
    }'])->setOptions([
            'defaultView'=>'month',
//            'header'=>['left'=>'title','center'=>'','right'=>'today prev,next'],
        ]);
        return view('event.index',compact('events','title','calendar'));
    }
}
