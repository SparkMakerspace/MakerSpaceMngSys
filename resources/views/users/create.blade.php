@extends('layouts.app')

@section('title')
    <h1>Create User</h1>
@endsection

@section('content')

    @if(Session::has('flash_message'))
        <div class="w3-panel w3-pale-green">
            <span onclick="this.parentElement.style.display='none'" class="w3-closebtn">&times;</span>
            <h4>{{Session::get('flash_message')}}</h4>
        </div>
    @endif
    {{--Profile Management Form--}}
    {!! Form::model($user, ['method'=>'store','url'=>route('users.store'),'class' => 'form-horizontal']) !!}

    {{--Usermane (STATIC) Can not be changed--}}
    <div class="form-group">
        {!! Form::label('username','Username:',['class'=>'col-md-2 control-label']) !!}
        <div class="col-md-10">
            {!! Form::text('username',null,['class'=>'form-control']) !!}
        </div>
        @if ($errors->has('username'))
            <span class="help-block">
                <strong>{{ $errors->first('username') }}</strong>
            </span>
        @endif
    </div>

    {{--Full Name--}}
    <div class="form-group">
        {!! Form::label('name','Full Name:',['class'=>'col-md-2 control-label']) !!}
        <div class="col-md-10">
            {!! Form::text('name',null,['class'=>'form-control']) !!}
        </div>
        @if ($errors->has('name'))
            <span class="help-block">
                <strong>{{ $errors->first('name') }}</strong>
            </span>
        @endif
    </div>

    {{--Email Address--}}
    <div class="form-group">
        {!! Form::label('email','Email Address:',['class'=>'col-md-2 control-label']) !!}
        <div class="col-md-10">
            {!! Form::email('email',null,['class'=>'form-control']) !!}
        </div>
        @if ($errors->has('email'))
            <span class="help-block">
                <strong>{{ $errors->first('email') }}</strong>
            </span>
        @endif
    </div>

    {{--Password--}}
    <div class="form-group">
        {!! Form::label('password','Password:',['class'=>'col-md-2 control-label']) !!}
        <div class="col-md-10">
            {!! Form::password('password',['class'=>'form-control']) !!}
        </div>
        @if ($errors->has('password'))
            <span class="help-block">
                <strong>{{ $errors->first('password') }}</strong>
            </span>
        @endif
    </div>
    {{--Password Confirmation--}}
    <div class="form-group">
        {!! Form::label('password_confirmation','Confirm:',['class'=>'col-md-2 control-label']) !!}
        <div class="col-md-10">
            {!! Form::password('password_confirmation',['class'=>'form-control']) !!}
        </div>
        @if ($errors->has('password_confirmation'))
            <span class="help-block">
                <strong>{{ $errors->first('password_confirmation') }}</strong>
            </span>
        @endif
    </div>

    <hr>

    {{--Interests Section--}}
    <h4>Choose Your Interests</h4>
    These interests are used to customize your experience.
    @include('bits.groupsSelector')

    {{--Submit and Cancel Buttons--}}
    <div class="btn-group" role="group" aria-label="...">
        {!! Form::submit('Create',['class'=>'btn btn-primary','name'=>'submit']) !!}
        {!! Html::link(URL::previous(),'Cancel',['class'=>'btn btn-danger']) !!}
    </div>
    {!! Form::close() !!}
@endsection