<?php

namespace App\Http\Controllers\ScaffoldInterface;

use App\Http\Controllers\Controller;
use \App\User;
use Hash;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = \App\User::all();

        return view('scaffold-interface.users.index', compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('scaffold-interface.users.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = new \App\User();

        $user->email = $request->email;
        $user->name = $request->name;
        $user->username = $request->username;
        $user->password = Hash::make($request->password);
        $user->address1 = $request->address1;
        $user->address2 = $request->address2;
        $user->city = $request->city;
        $user->state = $request->state;
        $user->zipcode = $request->zipcode;
        $user->phone = $request->phone;

        $user->save();
        $user->syncRoles([$request->role]);

        return redirect('users');
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $user = \App\User::findOrfail($id);
        $roles = Role::all()->pluck('name');
        $permissions = Permission::all()->pluck('name');
        $userRoles = $user->roles;
        $userPermissions = $user->permissions;

        return view('scaffold-interface.users.edit', compact('user', 'roles', 'permissions', 'userRoles', 'userPermissions'));
    }


    /**
     * @param $username
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function view($username)
    {
        $user = \App\User::where('username', '=' ,$username)->firstOrFail();;
        $roles = Role::all()->pluck('name');
        $permissions = Permission::all()->pluck('name');
        $userRoles = $user->roles;
        $userPermissions = $user->permissions;
        $posts = $user->posts()->orderBy('created_at','dec')->paginate(10);
        $groups = $user->groups;

        return view('scaffold-interface.users.show', compact('user', 'roles', 'permissions', 'userRoles', 'userPermissions', 'posts','groups'));
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = \App\User::findOrfail($request->user_id);
        $user->username = $request->username;
        $user->email = $request->email;
        $user->name = $request->name;
        if($request->password)
            $user->password = Hash::make($request->password);
        $user->address1 = $request->address1;
        $user->address2 = $request->address2;
        $user->city = $request->city;
        $user->state = $request->state;
        $user->zipcode = $request->zipcode;
        $user->phone = $request->phone;

        $user->save();
        $user->syncRoles([$request->role]);
        return redirect('scaffold-users');
    }


    /**
     * @param Request $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Routing\Redirector
     */
    public function addCreditCard(Request $request)
    {

        \Auth::user()->updateCard($request->stripeToken);


        return redirect('users');
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = \App\User::findOrfail($id);

        $user->delete();

        return redirect('users');
    }

    /**
     * Assign Role to user.
     *
     * @param \Illuminate\Http\Request
     *
     * @return \Illuminate\Http\Response
     */
    public function addRole(Request $request)
    {
        $user = \App\User::findOrfail($request->user_id);
        $user->assignRole($request->role_name);

        return redirect('scaffold-users/edit/'.$request->user_id);
    }

    /**
     * Assign Permission to a user.
     *
     * @param \Illuminate\Http\Request
     *
     * @return \Illuminate\Http\Response
     */
    public function addPermission(Request $request)
    {
        $user = \App\User::findorfail($request->user_id);
        $user->givePermissionTo($request->permission_name);

        return redirect('users/edit/'.$request->user_id);
    }

    /**
     * revoke Permission to a user.
     *
     * @param \Illuminate\Http\Request
     *
     * @return \Illuminate\Http\Response
     */
    public function revokePermission($permission, $user_id)
    {
        $user = \App\User::findorfail($user_id);

        $user->revokePermissionTo(str_slug($permission, ' '));

        return redirect('users/edit/'.$user_id);
    }

    /**
     * revoke Role to a a user.
     *
     * @param \Illuminate\Http\Request
     *
     * @return \Illuminate\Http\Response
     */
    public function revokeRole($role, $user_id)
    {
        $user = User::findorfail($user_id);

        $user->removeRole(str_slug($role, ' '));

        return redirect('users/edit/'.$user_id);
    }

    public function searchUser(Request $request){
        $query = $request->get('query');
        if($query == ''){
            $results = '[]';
        }
        else if ($query) {
            $results = User::where('username', 'like', '%' . $query . '%')->orWhere('name', 'like', '%' . $query . '%')->get();
            $results = $results->makeHidden('bio')->toJson();
        } else{
            $results = '[]';
        }
        return $results;
    }
}
