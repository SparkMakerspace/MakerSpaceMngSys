<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Auto3dprintercolor;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class Auto3dprintercolorController.
 *
 * @author  The scaffold-interface created at 2017-03-14 05:48:08am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintercolorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - auto3dprintercolor';
        $auto3dprintercolors = Auto3dprintercolor::paginate(6);
        return view('auto3dprintercolor.index',compact('auto3dprintercolors','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - auto3dprintercolor';
        
        return view('auto3dprintercolor.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $auto3dprintercolor = new Auto3dprintercolor();

        
        $auto3dprintercolor->color = $request->color;

        
        
        $auto3dprintercolor->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new auto3dprintercolor has been created !!']);

        return redirect('auto3dprintercolor');
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
        $title = 'Show - auto3dprintercolor';

        if($request->ajax())
        {
            return URL::to('auto3dprintercolor/'.$id);
        }

        $auto3dprintercolor = Auto3dprintercolor::findOrfail($id);
        return view('auto3dprintercolor.show',compact('title','auto3dprintercolor'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - auto3dprintercolor';
        if($request->ajax())
        {
            return URL::to('auto3dprintercolor/'. $id . '/edit');
        }

        
        $auto3dprintercolor = Auto3dprintercolor::findOrfail($id);
        return view('auto3dprintercolor.edit',compact('title','auto3dprintercolor'  ));
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
        $auto3dprintercolor = Auto3dprintercolor::findOrfail($id);
    	
        $auto3dprintercolor->color = $request->color;
        
        
        $auto3dprintercolor->save();

        return redirect('auto3dprintercolor');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/auto3dprintercolor/'. $id . '/delete');

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
     	$auto3dprintercolor = Auto3dprintercolor::findOrfail($id);
     	$auto3dprintercolor->delete();
        return URL::to('auto3dprintercolor');
    }
}
