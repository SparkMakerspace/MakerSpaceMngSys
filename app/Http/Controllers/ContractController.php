<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Support\Facades\App;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Contract;
use Amranidev\Ajaxis\Ajaxis;
use Illuminate\Validation\Rule;
use URL;

/**
 * Class ContractController.
 *
 * @author  The scaffold-interface created at 2017-11-19 09:43:39pm
 * @link  https://github.com/amranidev/scaffold-interface
 */
class ContractController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function index()
    {
        $title = 'Index - contract';
        $contracts = Contract::paginate(6);
        return view('contract.index', compact('contracts', 'title'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return  \Illuminate\Http\Response
     */
    public function create()
    {
        $title = 'Create - contract';

        return view('contract.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param    \Illuminate\Http\Request $request
     * @return  \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $contract = new Contract();


        $contract->text = $request->text;


        $contract->revision = $request->revision;


        $contract->save();



        return redirect('contract');
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
        $title = 'Show - contract';

        if ($request->ajax()) {
            return URL::to('contract/' . $id);
        }

        $contract = Contract::findOrfail($id);
        return view('contract.show', compact('title', 'contract'));
    }

    /**
     * Show the form for editing the specified resource.
     * @param    \Illuminate\Http\Request $request
     * @param    int $id
     * @return  \Illuminate\Http\Response
     */
    public function edit($id, Request $request)
    {
        $title = 'Edit - contract';
        if ($request->ajax()) {
            return URL::to('contract/' . $id . '/edit');
        }


        $contract = Contract::findOrfail($id);
        return view('contract.edit', compact('title', 'contract'));
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
        $contract = Contract::findOrfail($id);

        $contract->text = $request->text;

        $contract->revision = $request->revision;


        $contract->save();

        return redirect('contract');
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
        $msg = Ajaxis::BtDeleting('Warning!!', 'Would you like to remove This?', '/contract/' . $id . '/delete');

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
        $contract = Contract::findOrfail($id);
        $contract->delete();
        return URL::to('contract');
    }

    public function showLatest()
    {
        $latest = Contract::all()->sortByDesc('revision')->first();
        if (\Auth::user()->signature) {
            return view('contract.terms', ['contract' => $latest, 'signed' => 1]);
        } else {
            return view('contract.terms', ['contract' => $latest, 'signed' => 0]);
        }
    }

    public function acceptTerms(Request $request)
    {
        $user = \Auth::user();
        $this->validate($request, [
           'Signature' => Rule::in([$user->name])
        ]);

        if ($request->input('Signature',null)) {
            $user->signature = $request->Signature;
            $user->registration_state = 'payment';
            $user->acceptedTerms_timestamp = Carbon::now();
            $user->contract_id = Contract::all()->sortByDesc('revision')->first()->id;
            $user->save();
        } else {
            return redirect('/terms')->with('status', 'Something went wrong. Try re-signing.');
        }
        return redirect('/subscription/payment');
    }
}
