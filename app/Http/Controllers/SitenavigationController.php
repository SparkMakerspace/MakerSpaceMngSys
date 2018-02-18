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
        $title = 'Index - Sitenavigation';
        //return view('sitenavigation.index',compact('Sitenavigations','title'));
        return view('sitenavigation.index',compact('title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - Sitenavigation';

        return view('sitenavigation.edit');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $Sitenavigation = new Sitenavigation();


        $Sitenavigation->LinkText = $request->LinkText;


        $Sitenavigation->LinkImage = $request->LinkImage;


        $Sitenavigation->LinkLoginReqd = $request->LinkLoginReqd;


        $Sitenavigation->LinkURL = $request->LinkURL;


        $Sitenavigation->LinkDescription = $request->LinkDescription;



        $Sitenavigation->PageTitle = $request->PageTitle;


        $Sitenavigation->PageContent = $request->PageContent;


        $Sitenavigation->PagePublishDate = $request->PagePublishDate;


        $Sitenavigation->PageStub = $request->PageStub;


        $Sitenavigation->PageCSS = $request->PageCSS;


        $Sitenavigation->PageJavaScript = $request->PageJavaScript;


        $Sitenavigation->PageKeywords = $request->PageKeywords;



        $Sitenavigation->save();


        return redirect('Sitenavigation');
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
        $title = 'Show - Sitenavigation';

        if($request->ajax())
        {
            return URL::to('Sitenavigation/'.$id);
        }

        $Sitenavigation = Sitenavigation::findOrfail($id);
        return view('sitenavigation.show',compact('title','Sitenavigation'));
    }



    public function showp( $mystub = "",Request $request)
    {
        $title = 'Show - sitepage';
        $Sitenavigation = Sitenavigation::where('LinkURL' ,$mystub)->firstOrFail();


        return view('sitenavigation.show',compact('title','Sitenavigation'));
    }
    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - Sitenavigation';
        if($request->ajax())
        {
            return URL::to('Sitenavigation/'. $id . '/edit');
        }


        $Sitenavigation = Sitenavigation::findOrfail($id);
        return view('sitenavigation.edit',compact('title','Sitenavigation'  ));
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
        $Sitenavigation = Sitenavigation::findOrfail($id);

        $Sitenavigation->LinkText = $request->LinkText;

        $Sitenavigation->LinkImage = $request->LinkImage;

        $Sitenavigation->LinkLoginReqd = $request->LinkLoginReqd;

        $Sitenavigation->LinkURL = $request->LinkURL;

        $Sitenavigation->LinkDescription = $request->LinkDescription;


        $Sitenavigation->PageTitle = $request->PageTitle;


        $Sitenavigation->PageContent = $request->PageContent;


        $Sitenavigation->PagePublishDate = $request->PagePublishDate;


        $Sitenavigation->PageStub = $request->PageStub;


        $Sitenavigation->PageCSS = $request->PageCSS;


        $Sitenavigation->PageJavaScript = $request->PageJavaScript;


        $Sitenavigation->PageKeywords = $request->PageKeywords;




        $Sitenavigation->save();

        return redirect('Sitenavigation');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/Sitenavigation/'. $id . '/delete');

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
        $Sitenavigation = Sitenavigation::findOrfail($id);
        $Sitenavigation->delete();
        return URL::to('Sitenavigation');
    }
}