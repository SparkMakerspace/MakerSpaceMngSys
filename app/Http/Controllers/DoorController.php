<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Door;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class DoorController.
 *
 * @author  The scaffold-interface created at 2017-01-18 03:02:47am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class DoorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - door';
        $doors = Door::paginate(6);
        return view('door.index',compact('doors','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - door';
        
        return view('door.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $door = new Door();

        $door->name = $request->name;

        
        $door->sundayOpen = $request->sundayOpen;

        
        $door->sundayClose = $request->sundayClose;

        
        $door->mondayOpen = $request->mondayOpen;

        
        $door->mondayClose = $request->mondayClose;

        
        $door->tuesdayOpen = $request->tuesdayOpen;

        
        $door->tuesdayClose = $request->tuesdayClose;

        
        $door->wednesdayOpen = $request->wednesdayOpen;

        
        $door->wednesdayClose = $request->wednesdayClose;

        
        $door->thursdayOpen = $request->thursdayOpen;

        
        $door->thursdayClose = $request->thursdayClose;

        
        $door->fridayOpen = $request->fridayOpen;

        
        $door->fridayClose = $request->fridayClose;

        
        $door->saturdayOpen = $request->saturdayOpen;

        
        $door->saturdayClose = $request->saturdayClose;

        
        
        $door->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new door has been created !!']);

        return redirect('door');
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
        $title = 'Show - door';

        if($request->ajax())
        {
            return URL::to('door/'.$id);
        }

        $door = Door::findOrfail($id);
        return view('door.show',compact('title','door'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - door';
        if($request->ajax())
        {
            return URL::to('door/'. $id . '/edit');
        }

        
        $door = Door::findOrfail($id);
        return view('door.edit',compact('title','door'  ));
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
        $door = Door::findOrfail($id);
    	
        $door->sundayOpen = $request->sundayOpen;
        
        $door->sundayClose = $request->sundayClose;
        
        $door->mondayOpen = $request->mondayOpen;
        
        $door->mondayClose = $request->mondayClose;
        
        $door->tuesdayOpen = $request->tuesdayOpen;
        
        $door->tuesdayClose = $request->tuesdayClose;
        
        $door->wednesdayOpen = $request->wednesdayOpen;
        
        $door->wednesdayClose = $request->wednesdayClose;
        
        $door->thursdayOpen = $request->thursdayOpen;
        
        $door->thursdayClose = $request->thursdayClose;
        
        $door->fridayOpen = $request->fridayOpen;
        
        $door->fridayClose = $request->fridayClose;
        
        $door->saturdayOpen = $request->saturdayOpen;
        
        $door->saturdayClose = $request->saturdayClose;
        
        
        $door->save();

        return redirect('door');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/door/'. $id . '/delete');

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
     	$door = Door::findOrfail($id);
     	$door->delete();
        return URL::to('door');
    }
}
