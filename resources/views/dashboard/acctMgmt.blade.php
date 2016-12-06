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
        <div class="alert alert-success alert-dismissible" role="alert">
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                    &times;
                </span>
            </button>
            {{Session::get('flash_message')}}
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

@endsection

@section('footer')
    {{--Submit and Cancel Buttons--}}
    <div class="btn-group" role="group" aria-label="...">
        {!! Form::submit('Update Information',['class'=>'btn btn-primary','name'=>'submit']) !!}
        {!! Html::link(URL::previous(),'Cancel',['class'=>'btn btn-danger']) !!}
    </div>
    {!! Form::close() !!}
@endsection