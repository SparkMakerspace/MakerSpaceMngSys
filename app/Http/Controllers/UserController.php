<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('role:admin');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::paginate(20);
        return view('users.index',compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $user = new User;
        return view('users.create',compact('user'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->get('submit') != 'Cancel') {
            $user = new User;
            $this->validate($request,[
                'name' => 'required|max:255',
                'username' => 'required|min:6|unique:users,username',
                'email' => 'required|email|max:255|unique:users,email',
                'password' => 'required|min:6|confirmed',
            ]);
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = User::$roles[$request->role];
            $user->password = bcrypt($request->password);
            $user->save();
        }
        return redirect('/admin/users');
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return view('users.edit',compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        return view('users.edit',compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,$id)
    {
            $user = User::find($id);

            $this->validate($request,['name' => 'required|max:255']);
            $user->name = $request->name;

            if ($user->email != $request->email)
            {
                $this->validate($request,['email' => 'required|email|max:255|unique:users,email']);
                $user->email = $request->email;
            }

            if ($request->exists('role')) {
                $user->role = User::$roles[$request->role];
            }

            if($request->password != '')
            {
                $this->validate($request,['password' => 'required|min:6|confirmed']);
                $user->password = bcrypt($request->password);
            }

            $user->save();


        $newGroups = array_keys($request['group']);

        $user->groups()->detach($user->groups()->get());

        foreach ($newGroups as $group){
            $user->groups()->attach($group);
        }

        \Session::flash('flash_message','Changes Saved');

        return back();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $name = User::find($id)->name;
        User::destroy($id);
        return $name." successfully deleted.";
    }
}
