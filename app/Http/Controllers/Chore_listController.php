<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Chore_list;
use Amranidev\Ajaxis\Ajaxis;
use URL;

use App\Resource;


use App\User;


/**
 * Class Chore_listController.
 *
 * @author  The scaffold-interface created at 2017-03-30 01:48:44am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Chore_listController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - chore_list';
        $chore_lists = Chore_list::paginate(6);
        return view('chore_list.index',compact('chore_lists','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - chore_list';
        
        $resources = Resource::all()->pluck('name','id');
        
        $users = User::all()->pluck('username','id');
        
        return view('chore_list.create',compact('title','resources' , 'users'  ));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $chore_list = new Chore_list();

        
        $chore_list->Name = $request->Name;

        
        $chore_list->Description = $request->Description;

        if ($request->CompletedByUser ){
            $chore_list->CompletedByUser = $request->CompletedByUser;
        }

        
        $chore_list->TaskTimeReqd = $request->TaskTimeReqd;

        
        $chore_list->image = $request->image;

        
        $chore_list->NeedDate = $request->NeedDate;

        
        
        $chore_list->resource_id = $request->resource_id;

        
        $chore_list->user_id = $request->user_id;

        
        $chore_list->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new chore_list has been created !!']);

        return redirect('chore_list');
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
        $title = 'Show - chore_list';

        if($request->ajax())
        {
            return URL::to('chore_list/'.$id);
        }

        $chore_list = Chore_list::findOrfail($id);
        return view('chore_list.show',compact('title','chore_list'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - chore_list';
        if($request->ajax())
        {
            return URL::to('chore_list/'. $id . '/edit');
        }

        
        $resources = Resource::all()->pluck('name','id');

        
        $users = User::all()->pluck('username','id');

        
        $chore_list = Chore_list::findOrfail($id);
        return view('chore_list.edit',compact('title','chore_list' ,'resources', 'users' ) );
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
        $chore_list = Chore_list::findOrfail($id);
    	
        $chore_list->Name = $request->Name;
        
        $chore_list->Description = $request->Description;
        
        $chore_list->CompletedByUser = $request->CompletedByUser;
        
        $chore_list->TaskTimeReqd = $request->TaskTimeReqd;
        
        $chore_list->image = $request->image;
        
        $chore_list->NeedDate = $request->NeedDate;
        
        
        $chore_list->resource_id = $request->resource_id;

        
        $chore_list->user_id = $request->user_id;

        
        $chore_list->save();

        return redirect('chore_list');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/chore_list/'. $id . '/delete');

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
     	$chore_list = Chore_list::findOrfail($id);
     	$chore_list->delete();
        return URL::to('chore_list');
    }
}
