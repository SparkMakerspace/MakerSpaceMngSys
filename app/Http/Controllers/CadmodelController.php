<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Cadmodel;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class CadmodelController.
 *
 * @author  The scaffold-interface created at 2017-09-05 08:07:22pm
 * @link  https://github.com/amranidev/scaffold-interface
 */
class CadmodelController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - cadmodel';
        $cadmodels = Cadmodel::paginate(6);
        return view('cadmodel.index',compact('cadmodels','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - cadmodel';
        
        return view('cadmodel.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $cadmodel = new Cadmodel();

        
        $cadmodel->Name = $request->Name;

        
        $cadmodel->Description = $request->Description;

        
        $cadmodel->ModelFile = $request->ModelFile;

        
        $cadmodel->Material = $request->Material;

        
        
        $cadmodel->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new cadmodel has been created !!']);

        return redirect('cadmodel');
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
        $title = 'Show - cadmodel';

        if($request->ajax())
        {
            return URL::to('cadmodel/'.$id);
        }

        $cadmodel = Cadmodel::findOrfail($id);
        return view('cadmodel.show',compact('title','cadmodel'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - cadmodel';
        if($request->ajax())
        {
            return URL::to('cadmodel/'. $id . '/edit');
        }

        
        $cadmodel = Cadmodel::findOrfail($id);
        return view('cadmodel.edit',compact('title','cadmodel'  ));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */

    public function updatemodel($id,Request $request)
    {
        $cadmodel = Cadmodel::findOrfail($id);
        $cadmodel->ModelFile = $request->ModelFile;
        $cadmodel->save();

        return redirect('cadmodel');
    }



    public function update($id,Request $request)
    {
        $cadmodel = Cadmodel::findOrfail($id);
    	
        $cadmodel->Name = $request->Name;
        
        $cadmodel->Description = $request->Description;
        
        $cadmodel->ModelFile = $request->ModelFile;
        
        $cadmodel->Material = $request->Material;
        
        
        $cadmodel->save();

        return redirect('cadmodel');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/cadmodel/'. $id . '/delete');

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
     	$cadmodel = Cadmodel::findOrfail($id);
     	$cadmodel->delete();
        return URL::to('cadmodel');
    }
}
