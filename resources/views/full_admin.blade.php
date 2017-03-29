@extends('scaffold-interface.layouts.app')

@section('someSideBarJunk')

@endsection

@section('content')
    This page is a management dashboard for administrsators.
    <br>
    Will provide links to internal management related activities.
    <br>
    This page will also display some server stats

    <br>

    <ul>
        <li class="header">ADMINISTRATOR</li>

        <li class="treeview"><a href="{{url('/users')}}"><i class="fa fa-users"></i> <span>Users</span></a></li>

        <li class="treeview"><a href="{{url('/roles')}}"><i class="fa fa-user-plus"></i> <span>Role</span></a></li>

        <li class="treeview"><a href="{{url('/permissions')}}"><i class="fa fa-key"></i> <span>Permissions</span></a></li>

        <li class="treeview"><a href="{{url('/sitenavigation')}}"><i class="fa fa-key"></i> <span>Site Navigation</span></a></li>

        <li class="treeview"><a href="{{url('/sitepage')}}"><i class="fa fa-key"></i> <span>Site Perminant Pages Manager</span></a></li>

    </ul>



@endsection