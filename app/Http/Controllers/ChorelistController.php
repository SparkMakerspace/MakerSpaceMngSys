<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Chorelist;
use Amranidev\Ajaxis\Ajaxis;
use URL;
use Carbon\Carbon;
/**
 * Class ChorelistController.
 *
 * @author  The scaffold-interface created at 2018-02-21 03:00:52am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class ChorelistController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $chorelists = Chorelist::all()->where('CompletedDate', '==', null );
        return view('chorelist.index', compact('chorelists'));
    }


    public function completed()
    {
        $chorelists = Chorelist::all()->where('CompletedDate', '!=', null );
        return view('chorelist.index', compact('chorelists'));
    }


    public function ididit($id, Request $request)
    {
        $chorelist = Chorelist::findOrfail($id);


        $chorelist->CompleterID = \Auth::user()->id;
        $chorelist->CompletedDate = \Carbon\Carbon::now();

        $chorelist->save();
        return redirect('chorelist');
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {

        return view('chorelist.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $chorelist = new Chorelist();


        $chorelist->ChoreName = $request->ChoreName;

        if ($request->RequireDate) {
            $chorelist->RequireDate = $request->RequireDate;
        }


        if ($request->CompletedDate) {
            $chorelist->CompletedDate = $request->CompletedDate;
        }


        $chorelist->CreatorID = \Auth::user()->id;


        $chorelist->ChoreDescription = $request->ChoreDescription;

        if($request->HoursREQD)
        {
            $chorelist->HoursREQD = $request->HoursREQD;
        }
        else
        {
            $request->HoursREQD = 0;
        }


        $chorelist->save();

        return redirect('chorelist');
    }

    /**
     * Display the specified resource.
     *
     * @param    \Illuminate\Http\Request $request
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function show($id, Request $request)
    {
        if ($request->ajax()) {
            return URL::to('chorelist/' . $id);
        }

        $chorelist = Chorelist::findOrfail($id);
        return view('chorelist.show', compact('chorelist'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request $request
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        if ($request->ajax()) {
            return URL::to('chorelist/' . $id . '/edit');
        }


        $chorelist = Chorelist::findOrfail($id);
        return view('chorelist.edit', compact('chorelist'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param    \Illuminate\Http\Request $request
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $chorelist = Chorelist::findOrfail($id);


        $chorelist->ChoreName = $request->ChoreName;

        if ($request->RequireDate) {
            $chorelist->RequireDate = $request->RequireDate;
        }


        if ($request->CompletedDate) {
            $chorelist->CompletedDate = $request->CompletedDate;
        }


        $chorelist->ChoreDescription = $request->ChoreDescription;

        if($request->HoursREQD)
        {
            $chorelist->HoursREQD = $request->HoursREQD;
        }



        $chorelist->save();


        return redirect('chorelist');
    }

    /**
     * Delete confirmation message by Ajaxis.
     *
     * @link      https://github.com/amranidev/ajaxis
     * @param    \Illuminate\Http\Request $request
     * @return  String
     */
    public function DeleteMsg($id, Request $request)
    {
        $msg = Ajaxis::BtDeleting('Warning!!', 'Would you like to remove This?', '/chorelist/' . $id . '/delete/');

        if ($request->ajax()) {
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
        $chorelist = Chorelist::findOrfail($id);
        $chorelist->delete();
        return URL::to('chorelist');
    }
}
