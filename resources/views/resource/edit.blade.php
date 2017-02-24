@extends('scaffold-interface.layouts.app')
@section('title','Equipment and Resources - Edit')
@section('content')

<section class="content">
    <h1>
        {{$title}}
    </h1>
    <form method = 'get' action = '{!!url("resource")!!}'>
        <button class = 'btn btn-danger'>resource Index</button>
    </form>
    <br>

    @if(isset($resource))
        {!! Form::model($resource, ['action' => ['ResourceController@update', $resource->id]]) !!}
    @else
        {!! Form::open(['action' => 'ResourceController@store']) !!}
    @endif
    <div class="form-group">
        {!! Form::label('name', 'Name') !!}
        {!! Form::text('name') !!}
    </div>
    <div class="form-group">
        {!! Form::label('type', 'Type') !!}
        {!! Form::text('type') !!}
    </div>
    <div class="form-group">
        {!! Form::label('description', 'Description') !!}
        {!! Form::text('description') !!}
    </div>
    <div class="form-group">
        {!! Form::label('requiresAuth', 'Required Training') !!}
        {!! Form::checkbox('requiresAuth', 'value') !!}
    </div>

    <div class="form-group">
        {!! Form::submit('Submit') !!}
    </div>



    {!! Form::close() !!}
</section>
@endsection

@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    <form class = 'col s3' method = 'get' action = '{!!url("g")!!}/create'>
        <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/resource/{!!$resource->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
        <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/resource/{!!$resource->id!!}/edit'><i class = 'material-icons'>edit</i></a>
        <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/resource/{!!$resource->id!!}'><i class = 'material-icons'>info</i></a>
    </form>
    @endhasanyrole
@endsection

