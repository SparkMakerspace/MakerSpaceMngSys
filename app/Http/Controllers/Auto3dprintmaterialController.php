<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Auto3dprintmaterial;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class Auto3dprintmaterialController.
 *
 * @author  The scaffold-interface created at 2017-03-14 05:49:10am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Auto3dprintmaterialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - auto3dprintmaterial';
        $auto3dprintmaterials = Auto3dprintmaterial::paginate(6);
        return view('auto3dprintmaterial.index',compact('auto3dprintmaterials','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - auto3dprintmaterial';
        
        return view('auto3dprintmaterial.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $auto3dprintmaterial = new Auto3dprintmaterial();

        
        $auto3dprintmaterial->material = $request->material;

        
        
        $auto3dprintmaterial->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new auto3dprintmaterial has been created !!']);

        return redirect('auto3dprintmaterial');
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
        $title = 'Show - auto3dprintmaterial';

        if($request->ajax())
        {
            return URL::to('auto3dprintmaterial/'.$id);
        }

        $auto3dprintmaterial = Auto3dprintmaterial::findOrfail($id);
        return view('auto3dprintmaterial.show',compact('title','auto3dprintmaterial'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - auto3dprintmaterial';
        if($request->ajax())
        {
            return URL::to('auto3dprintmaterial/'. $id . '/edit');
        }

        
        $auto3dprintmaterial = Auto3dprintmaterial::findOrfail($id);
        return view('auto3dprintmaterial.edit',compact('title','auto3dprintmaterial'  ));
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
        $auto3dprintmaterial = Auto3dprintmaterial::findOrfail($id);
    	
        $auto3dprintmaterial->material = $request->material;
        
        
        $auto3dprintmaterial->save();

        return redirect('auto3dprintmaterial');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/auto3dprintmaterial/'. $id . '/delete');

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
     	$auto3dprintmaterial = Auto3dprintmaterial::findOrfail($id);
     	$auto3dprintmaterial->delete();
        return URL::to('auto3dprintmaterial');
    }
}
