<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Resource_type;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class Resource_typeController.
 *
 * @author  The scaffold-interface created at 2017-01-24 12:34:59am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Resource_typeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - resource_type';
        $resource_types = Resource_type::paginate(6);
        return view('resource_type.index',compact('resource_types','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - resource_type';
        
        return view('resource_type.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $resource_type = new Resource_type();

        
        $resource_type->value = $request->value;

        
        
        $resource_type->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new resource_type has been created !!']);

        return redirect('resource_type');
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
        $title = 'Show - resource_type';

        if($request->ajax())
        {
            return URL::to('resource_type/'.$id);
        }

        $resource_type = Resource_type::findOrfail($id);
        return view('resource_type.show',compact('title','resource_type'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - resource_type';
        if($request->ajax())
        {
            return URL::to('resource_type/'. $id . '/edit');
        }

        
        $resource_type = Resource_type::findOrfail($id);
        return view('resource_type.edit',compact('title','resource_type'  ));
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
        $resource_type = Resource_type::findOrfail($id);
    	
        $resource_type->value = $request->value;
        
        
        $resource_type->save();

        return redirect('resource_type');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/resource_type/'. $id . '/delete');

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
     	$resource_type = Resource_type::findOrfail($id);
     	$resource_type->delete();
        return URL::to('resource_type');
    }
}
