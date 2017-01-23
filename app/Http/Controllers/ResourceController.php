<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Resource;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class ResourceController.
 *
 * @author  The scaffold-interface created at 2017-01-21 05:15:33am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class ResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - resource';
        $resources = Resource::paginate(6);
        return view('resource.index',compact('resources','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - resource';
        
        return view('resource.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $resource = new Resource();

        
        $resource->name = $request->name;

        
        $resource->location = $request->location;

        
        $resource->type = $request->type;

        
        $resource->description = $request->description;

        
        $resource->requiresAuth = $request->requiresAuth;

        
        
        $resource->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new resource has been created !!']);

        return redirect('resource');
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
        $title = 'Show - resource';

        if($request->ajax())
        {
            return URL::to('resource/'.$id);
        }

        $resource = Resource::findOrfail($id);
        return view('resource.show',compact('title','resource'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - resource';
        if($request->ajax())
        {
            return URL::to('resource/'. $id . '/edit');
        }

        
        $resource = Resource::findOrfail($id);
        return view('resource.edit',compact('title','resource'  ));
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
        $resource = Resource::findOrfail($id);
    	
        $resource->name = $request->name;
        
        $resource->location = $request->location;
        
        $resource->type = $request->type;
        
        $resource->description = $request->description;
        
        $resource->requiresAuth = $request->requiresAuth;
        
        
        $resource->save();

        return redirect('resource');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/resource/'. $id . '/delete');

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
     	$resource = Resource::findOrfail($id);
     	$resource->delete();
        return URL::to('resource');
    }
}
