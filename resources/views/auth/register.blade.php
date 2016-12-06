@extends('layouts.app')

@section('title')
    <h1>Register New Account</h1>
@endsection

@section('content')

    {!! Form::model(\App\User::class, ['route'=>'register','class' => 'form-horizontal']) !!}

    @include('bits.userForm')

    <hr>

    {{--Interests Section--}}
    <h4>Choose Your Interests</h4>
    These interests are used to customize your experience.

    @include('bits.groupsSelector')

@endsection

@section('footer')
    <div class="btn-group" role="group" aria-label="...">
        {!! Form::submit('Register User',['class'=>'btn btn-primary','name'=>'submit']) !!}
        {!! Html::link(URL::previous(),'Cancel',['class'=>'btn btn-danger']) !!}
    </div>

    {!! Form::close() !!}

@endsection
