<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Sitepage;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class SitepageController.
 *
 * @author  The scaffold-interface created at 2017-03-16 01:15:50am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class SitepageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - sitepage';
        $sitepages = Sitepage::paginate(10);
        return view('sitepage.index',compact('sitepages','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        return $this->edit();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $sitepage = new Sitepage();

        
        $sitepage->PageTitle = $request->PageTitle;

        
        $sitepage->PageContent = $request->PageContent;

        
        $sitepage->PagePublishDate = $request->PagePublishDate;

        
        $sitepage->PageStub = $request->PageStub;

        
        $sitepage->PageCSS = $request->PageCSS;

        
        $sitepage->PageJavaScript = $request->PageJavaScript;

        
        $sitepage->PageKeywords = $request->PageKeywords;

        
        
        $sitepage->save();

        $pusher = App::make('pusher');

        //default pusher notification.
        //by default channel=test-channel,event=test-event
        //Here is a pusher notification example when you create a new resource in storage.
        //you can modify anything you want or use it wherever.
        $pusher->trigger('test-channel',
                         'test-event',
                        ['message' => 'A new sitepage has been created !!']);

        return redirect('sitepage');
    }

    /**
     * Display the specified resource.
     *
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function show($id = "",Request $request)
    {
        $title = 'Show - sitepage';
            if($request->ajax())
            {
                return URL::to('sitepage/'.$id);
            }

            $sitepage = Sitepage::findOrfail($id);


        return view('sitepage.show',compact('title','sitepage'));
    }

    public function showp( $mystub = "",Request $request)
    {
            $title = 'Show - sitepage';
            $sitepage = Sitepage::where('PageStub' ,$mystub)->first();


        return view('sitepage.show',compact('title','sitepage'));
    }
    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id = null, Request $request = null)
    {
        if(!is_null($id)) {
            $title = 'Edit Page';
            $submit = 'Update';
            $sitepage = Sitepage::findOrfail($id);
            if ($request->ajax()) {
                return URL::to('sitepage/' . $id . '/edit');
            }
            return view('sitepage.edit', compact('title','sitepage','submit'));
        }
        else {
            $title = 'Create Page';
            $submit = 'Create';
            return view('sitepage.edit', compact('title','submit'));
        }
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
        $sitepage = Sitepage::findOrfail($id);
    	
        $sitepage->PageTitle = $request->PageTitle;
        
        $sitepage->PageContent = $request->PageContent;
        
        $sitepage->PagePublishDate = $request->PagePublishDate;
        
        $sitepage->PageStub = $request->PageStub;
        
        $sitepage->PageCSS = $request->PageCSS;
        
        $sitepage->PageJavaScript = $request->PageJavaScript;
        
        $sitepage->PageKeywords = $request->PageKeywords;
        
        
        $sitepage->save();

        return redirect('sitepage');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/sitepage/'. $id . '/delete');

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
     	$sitepage = Sitepage::findOrfail($id);
     	$sitepage->delete();
        return URL::to('sitepage');
    }
}
