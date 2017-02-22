@extends('scaffold-interface.layouts.app')

@section('someSideBarJunk')
    <li class="treeview"><a href="{{url('./event')}}"></i> <span>Calender</span></a></li>
    <li class="treeview"><a href="{{url('./g/')}}"></i> <span>Groups</span></a></li>
    <li class="treeview"><a href="{{url('./posts/')}}"></i> <span>Post</span></a></li>
    <li class="treeview"><a href="{{url('./resource/')}}"></i> <span>Resource</span></a></li>


    <li class="treeview"><a href="{{url('./comment/')}}"></i> <span>Comments</span></a></li>

    <li class="treeview"><a href="{{url('./Door/')}}"></i> <span>Doors</span></a></li>

    <li class="treeview"><a href="{{url('./image/')}}"></i> <span>Images</span></a></li>

    <li class="treeview"><a href="{{url('./resource/')}}"></i> <span>Resource</span></a></li>

    <li class="treeview"><a href="{{url('./test/')}}"></i> <span>Test</span></a></li>

@endsection

@section('content')
    <div class="content">
        <h1 class="title">
            SPARK MAKERSPACE!!!! WOOOOOO!!!



        </h1>
    </div>
@endsection