@extends('layouts.app')

@section('title')
    <h1>Your Dashboard</h1>
    This is your personalized view of Spark
@endsection

@section('left-sidebar')
    <ul class="nav nav-pills nav-stacked">
        <li class="active"><a href="#">Dashboard</a></li>
        <li><a href="{{URL::route('dashboard.acctMgmt')}}">Account Management</a></li>
    </ul>
@endsection
@section('content')
    <article>
        Posts
    </article>
    <article>
        Calendar
    </article>
@endsection