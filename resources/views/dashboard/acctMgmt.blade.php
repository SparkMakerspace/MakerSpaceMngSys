@extends('layouts.app')

@section('title')
    <h1>Manage your preferences</h1>
@endsection

@section('left-sidebar')
    <ul class="nav nav-pills nav-stacked">
        <li><a href="{{URL::route('dashboard')}}">Dashboard</a></li>
        <li class="active"><a href="#">Account Management</a></li>
    </ul>
@endsection

@section('content')

    @if(Session::has('flash_message'))
        <div class="w3-panel w3-pale-green" role="alert">
            <span onclick="this.parentElement.style.display='none'" class="w3-closebtn">&times;</span>
            <h4>{{Session::get('flash_message')}}</h4>
        </div>
    @endif

    {{--Account Management Form--}}
    {!! Form::model($user, ['method'=>'put','url'=>route('users.update',['id'=>$user->id]),'class' => 'form-horizontal']) !!}

    @include('bits.userForm')

    <hr>

    {{--Interests Section--}}
    <h4>Manage Your Interests</h4>
    These interests are used to customize your experience.

    @include('bits.groupsSelector')

    {{--Submit and Cancel Buttons--}}
    <br>
    {!! Form::submit('Update Information',['class'=>'w3-btn w3-blue','name'=>'submit']) !!}
    {!! Form::close() !!}
@endsection