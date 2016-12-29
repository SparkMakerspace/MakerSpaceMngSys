@extends('layouts.app')

@section('title')
    <h1>Register New Account</h1>
@endsection

@section('content')

    {!! Form::model(\App\User::class, ['route'=>'register']) !!}

    @include('bits.userForm')

    {{--Interests Section--}}
    <h4>Choose Your Interests</h4>
    These interests are used to customize your experience.

    @include('bits.groupsSelector')

    <div class="w3-btn-group w3-section" role="group" aria-label="...">
        {!! Form::submit('Register User',['class'=>'w3-btn w3-blue','name'=>'submit']) !!}
    </div>

    {!! Form::close() !!}
<br>
@endsection
