<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Sitenavigation;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class SitenavigationController.
 *
 * @author  The scaffold-interface created at 2017-03-16 12:59:53am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class SitenavigationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - sitenavigation';
        //return view('sitenavigation.index',compact('sitenavigations','title'));
        return view('sitenavigation.index',compact('title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - sitenavigation';
        
        return view('sitenavigation.edit');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store($id = null, Request $request)
    {
        If (isset($id))
        {
            $sitenavigation = Sitenavigation::findOrfail($id);
        }
        else
        {
            $sitenavigation = new Sitenavigation();
        }




        
        $sitenavigation->LinkText = $request->LinkText;

        
        $sitenavigation->LinkImage = $request->LinkImage;

        
        $sitenavigation->LinkLoginReqd = $request->LinkLoginReqd;

        
        $sitenavigation->LinkURL = $request->LinkURL;

        
        $sitenavigation->LinkDescription = $request->LinkDescription;

        
        
        $sitenavigation->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new sitenavigation has been created !!']);

        return redirect('sitenavigation');
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
        $title = 'Show - sitenavigation';

        if($request->ajax())
        {
            return URL::to('sitenavigation/'.$id);
        }

        $sitenavigation = Sitenavigation::findOrfail($id);
        return view('sitenavigation.show',compact('title','sitenavigation'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - sitenavigation';
        if($request->ajax())
        {
            return URL::to('sitenavigation/'. $id . '/edit');
        }

        
        $sitenavigation = Sitenavigation::findOrfail($id);
        return view('sitenavigation.edit',compact('title','sitenavigation'  ));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function update($id = null, Request $request)
    {
        If (isset($id))
        {
            $sitenavigation = Sitenavigation::findOrfail($id);
        }
        else
        {
            $sitenavigation = new Sitenavigation();
        }

        $sitenavigation = Sitenavigation::findOrfail($id);
    	
        $sitenavigation->LinkText = $request->LinkText;
        
        $sitenavigation->LinkImage = $request->LinkImage;
        
        $sitenavigation->LinkLoginReqd = $request->LinkLoginReqd;
        
        $sitenavigation->LinkURL = $request->LinkURL;
        
        $sitenavigation->LinkDescription = $request->LinkDescription;
        
        
        $sitenavigation->save();

        return redirect('sitenavigation');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/sitenavigation/'. $id . '/delete');

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
     	$sitenavigation = Sitenavigation::findOrfail($id);
     	$sitenavigation->delete();
        return URL::to('sitenavigation');
    }
}
