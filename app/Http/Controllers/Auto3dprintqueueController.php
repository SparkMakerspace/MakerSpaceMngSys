<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Auto3dprintqueue;
use Amranidev\Ajaxis\Ajaxis;
use URL;

use App\Auto3dprintercolor;


use App\Auto3dprintmaterial;

use Storage;
use App\User;


/**
 * Class Auto3dprintqueueController.
 *
 * @author  The scaffold-interface created at 2017-03-14 06:02:31am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintqueueController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - auto3dprintqueue';
        $auto3dprintqueues = Auto3dprintqueue::paginate(20);
        return view('auto3dprintqueue.index',compact('auto3dprintqueues','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - auto3dprintqueue';
        
        $auto3dprintercolors = Auto3dprintercolor::all()->pluck('color','id');
        
        $auto3dprintmaterials = Auto3dprintmaterial::all()->pluck('material','id');
        
        $users = User::all()->pluck('name','id');
        
        return view('auto3dprintqueue.create',compact('title','auto3dprintercolors' , 'auto3dprintmaterials' , 'users'  ));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {




        $auto3dprintqueue = new Auto3dprintqueue();

        
        $auto3dprintqueue->Name = $request->file('upload')->getClientOriginalName();

        $auto3dprintqueue->path = '';

        $auto3dprintqueue->Infill = $request->Infill;


        $auto3dprintqueue->Status = "";

        
        $auto3dprintqueue->Notified = 0;


        $auto3dprintqueue->auto3dprintercolor_id = $request->auto3dprintercolor_id;

        
        $auto3dprintqueue->auto3dprintmaterial_id = $request->auto3dprintmaterial_id;

        
        $auto3dprintqueue->user_id = \Auth::user()->id;

        
        $auto3dprintqueue->save();

        $path = Storage::putFileAs('3dPrintFiles', $request->file('upload'),$auto3dprintqueue->id.".stl", 'public');

        $pusher = App::make('pusher');

        $output = shell_exec("..\\slic3r\\slic3r-console.exe ..\\storage\\app\\".$path);

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new auto3dprintqueue has been created !!']);

        return redirect('auto3dprintqueue');
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
        $title = 'Show - auto3dprintqueue';

        if($request->ajax())
        {
            return URL::to('auto3dprintqueue/'.$id);
        }

        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);
        return view('auto3dprintqueue.show',compact('title','auto3dprintqueue'));
    }






    public function showGcode($id,Request $request)
    {
        $title = 'Show - auto3dprintcue';

        if($request->ajax())
        {
            return URL::to('auto3dprintcue/'.$id);
        }

        $myyfileout = file_get_contents("../storage/app/3dPrintFiles/".$id.".gcode");


        $myyfileout = file_get_contents("../storage/app/3dPrintFiles/".$id.".gcode");
        return response($myyfileout, 200)->header('Content-Type', 'application/text');
    }


    public function showGcodeViewer($id,Request $request)
    {
        $title = 'Show - auto3dprintcue';

        if($request->ajax())
        {
            return URL::to('auto3dprintcue/'.$id);
        }
        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);
        $myyfileout = file_get_contents("../storage/app/3dPrintFiles/".$id.".gcode");
        return view('auto3dprintqueue.showGcode',compact('title','auto3dprintqueue')) ->with('MyGcode', $myyfileout);
    }



    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - auto3dprintqueue';
        if($request->ajax())
        {
            return URL::to('auto3dprintqueue/'. $id . '/edit');
        }

        
        $auto3dprintercolors = Auto3dprintercolor::all()->pluck('color','id');

        
        $auto3dprintmaterials = Auto3dprintmaterial::all()->pluck('material','id');

        
        $users = User::all()->pluck('name','id');

        
        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);
        return view('auto3dprintqueue.edit',compact('title','auto3dprintqueue' ,'auto3dprintercolors', 'auto3dprintmaterials', 'users' ) );
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
        $auto3dprintqueue = Auto3dprintqueue::findOrfail($id);
    	
        $auto3dprintqueue->Name = $request->Name;
        
        $auto3dprintqueue->Infill = $request->Infill;
        
        $auto3dprintqueue->Status = $request->Status;
        
        $auto3dprintqueue->Notified = $request->Notified;
        
        
        $auto3dprintqueue->auto3dprintercolor_id = $request->auto3dprintercolor_id;

        
        $auto3dprintqueue->auto3dprintmaterial_id = $request->auto3dprintmaterial_id;

        
        $auto3dprintqueue->user_id = $request->user_id;

        
        $auto3dprintqueue->save();

        return redirect('auto3dprintqueue');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/auto3dprintqueue/'. $id . '/delete');

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
     	$auto3dprintqueue = Auto3dprintqueue::findOrfail($id);
     	$auto3dprintqueue->delete();
        return URL::to('auto3dprintqueue');
    }
}
