<?php

namespace App\Http\Controllers;

use App\Event;
use Illuminate\Http\Request;

class EventTemplateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param Request $request
     * @return \Illuminate\Http\Response
     * @internal param \App\Http\Controllers\EventController $eventController
     */
    public function index(Request $request)
    {
        $title = 'Index - Event Templates';
        $events = Event::where('isTemplate','=',1)->get();
        return view('event.template.index',compact('events','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @param  \App\Http\Controllers\EventController  $eventController
     * @return \Illuminate\Http\Response
     */
    public function create(EventController $eventController)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Controllers\EventController  $eventController
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, EventController $eventController)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Http\Controllers\EventController  $eventController
     * @param  \Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(EventController $eventController, DummyModelClass $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Http\Controllers\EventController  $eventController
     * @param  \Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(EventController $eventController, DummyModelClass $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Http\Controllers\EventController  $eventController
     * @param  \Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, EventController $eventController, DummyModelClass $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Http\Controllers\EventController  $eventController
     * @param  \Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(EventController $eventController, DummyModelClass $event)
    {
        //
    }
}
