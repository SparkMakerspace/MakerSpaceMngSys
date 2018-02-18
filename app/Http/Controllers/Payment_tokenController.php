<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Payment_token;
use Amranidev\Ajaxis\Ajaxis;
use URL;

/**
 * Class Payment_tokenController.
 *
 * @author  The scaffold-interface created at 2017-11-20 04:44:41am
 * @link  https://github.com/amranidev/scaffold-interface
 */
class Payment_tokenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - payment_token';
        $payment_tokens = Payment_token::paginate(6);
        return view('payment_token.index',compact('payment_tokens','title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - payment_token';
        
        return view('payment_token.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request  $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        dd($request);
        $payment_token = new Payment_token();

        
        $payment_token->token = $request->token;

        
        $payment_token->selected = $request->selected;

        
        
        $payment_token->save();


        return redirect('payment_token');
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
        $title = 'Show - payment_token';

        if($request->ajax())
        {
            return URL::to('payment_token/'.$id);
        }

        $payment_token = Payment_token::findOrfail($id);
        return view('payment_token.show',compact('title','payment_token'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request  $request
     * @param    int  $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id,Request $request)
    {
        $title = 'Edit - payment_token';
        if($request->ajax())
        {
            return URL::to('payment_token/'. $id . '/edit');
        }

        
        $payment_token = Payment_token::findOrfail($id);
        return view('payment_token.edit',compact('title','payment_token'  ));
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
        $payment_token = Payment_token::findOrfail($id);
    	
        $payment_token->token = $request->token;
        
        $payment_token->selected = $request->selected;
        
        
        $payment_token->save();

        return redirect('payment_token');
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
        $msg = Ajaxis::BtDeleting('Warning!!','Would you like to remove This?','/payment_token/'. $id . '/delete');

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
     	$payment_token = Payment_token::findOrfail($id);
     	$payment_token->delete();
        return URL::to('payment_token');
    }
}
