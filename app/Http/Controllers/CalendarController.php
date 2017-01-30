<?php

namespace App\Http\Controllers;

use App\Event;
use FullCal;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
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
     * @param array $filters
     * @return FullCal
     * @internal param Request $request
     * @internal param int $id
     */
    public function show(Array $filters)
    {

        $calendar = FullCal::setId('1');

        foreach ($filters as $group){
            $calendar->addEvents($group->events()->get()->toArray());
        }

        return $calendar;
    }

}
