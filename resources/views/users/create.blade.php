@extends('layouts.app')

@section('title')
    <h1>Create User</h1>
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
@endsection

@section('footer')
    {{--Submit and Cancel Buttons--}}
    <div class="btn-group" role="group" aria-label="...">
        {!! Form::submit('Create',['class'=>'btn btn-primary','name'=>'submit']) !!}
        {!! Html::link(URL::previous(),'Cancel',['class'=>'btn btn-danger']) !!}
    </div>
    {!! Form::close() !!}
@endsection