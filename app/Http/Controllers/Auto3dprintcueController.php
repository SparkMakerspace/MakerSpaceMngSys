<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Auto3dprintcue;
use Amranidev\Ajaxis\Ajaxis;
use URL;

use App\Auto3dprintercolor;


use App\Auto3dprintmaterial;

use Storage;
use App\User;


/**
 * Class Auto3dprintcueController.
 *
 * @author  The scaffold-interface created at 2017-03-14 06:02:31am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintcueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - auto3dprintcue';
        $auto3dprintcues = Auto3dprintcue::paginate(20);
        return view('auto3dprintcue.index',compact('auto3dprintcues','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - auto3dprintcue';
        
        $auto3dprintercolors = Auto3dprintercolor::all()->pluck('color','id');
        
        $auto3dprintmaterials = Auto3dprintmaterial::all()->pluck('material','id');
        
        $users = User::all()->pluck('name','id');
        
        return view('auto3dprintcue.create',compact('title','auto3dprintercolors' , 'auto3dprintmaterials' , 'users'  ));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $path = Storage::putFile('3dPrintFiles', $request->file('upload'), 'public');


        $auto3dprintcue = new Auto3dprintcue();

        
        $auto3dprintcue->Name = $request->file('upload')->getClientOriginalName();

        $auto3dprintcue->Path = $path;

        $auto3dprintcue->Infill = $request->Infill;

        
        $auto3dprintcue->Status = "";

        
        $auto3dprintcue->Notified = 0;

        
        
        $auto3dprintcue->auto3dprintercolor_id = $request->auto3dprintercolor_id;

        
        $auto3dprintcue->auto3dprintmaterial_id = $request->auto3dprintmaterial_id;

        
        $auto3dprintcue->user_id = \Auth::user()->id;

        
        $auto3dprintcue->save();



        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new auto3dprintcue has been created !!']);

        return redirect('auto3dprintcue');
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
        $title = 'Show - auto3dprintcue';

        if($request->ajax())
        {
            return URL::to('auto3dprintcue/'.$id);
        }

        $auto3dprintcue = Auto3dprintcue::findOrfail($id);
        return view('auto3dprintcue.show',compact('title','auto3dprintcue'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - auto3dprintcue';
        if($request->ajax())
        {
            return URL::to('auto3dprintcue/'. $id . '/edit');
        }

        
        $auto3dprintercolors = Auto3dprintercolor::all()->pluck('color','id');

        
        $auto3dprintmaterials = Auto3dprintmaterial::all()->pluck('material','id');

        
        $users = User::all()->pluck('name','id');

        
        $auto3dprintcue = Auto3dprintcue::findOrfail($id);
        return view('auto3dprintcue.edit',compact('title','auto3dprintcue' ,'auto3dprintercolors', 'auto3dprintmaterials', 'users' ) );
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
        $auto3dprintcue = Auto3dprintcue::findOrfail($id);
    	
        $auto3dprintcue->Name = $request->Name;
        
        $auto3dprintcue->Infill = $request->Infill;
        
        $auto3dprintcue->Status = $request->Status;
        
        $auto3dprintcue->Notified = $request->Notified;
        
        
        $auto3dprintcue->auto3dprintercolor_id = $request->auto3dprintercolor_id;

        
        $auto3dprintcue->auto3dprintmaterial_id = $request->auto3dprintmaterial_id;

        
        $auto3dprintcue->user_id = $request->user_id;

        
        $auto3dprintcue->save();

        return redirect('auto3dprintcue');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/auto3dprintcue/'. $id . '/delete');

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
     	$auto3dprintcue = Auto3dprintcue::findOrfail($id);
     	$auto3dprintcue->delete();
        return URL::to('auto3dprintcue');
    }
}
