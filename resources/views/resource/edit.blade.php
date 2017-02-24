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

    {!! Form::model($resource, ['action' => ['ResourceController@update', $resource->id]]) !!}

    <div class="form-group">
        {!! Form::label('id', 'Recorrd ID') !!}
        {!! Form::text('id') !!}
    </div>
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
        {!! Form::label('description', 'Description') !!}
        {!! Form::text('description') !!}
    </div>

    {{--<form method = 'POST' action = '{!! url("resource")!!}/{!!$resource->--}}
        {{--id!!}/update'> --}}
        {{--<input type = 'hidden' name = '_token' value = '{{Session::token()}}'>--}}
        {{--<div class="form-group">--}}
            {{--<label for="name">name</label>--}}
            {{--<input id="name" name = "name" type="text" class="form-control" value="{!!$resource->--}}
            {{--name!!}"> --}}
        {{--</div>--}}
        {{--<div class="form-group">--}}
            {{--<label for="location">location</label>--}}
            {{--<input id="location" name = "location" type="text" class="form-control" value="{!!$resource->--}}
            {{--location!!}"> --}}
        {{--</div>--}}
        {{--<div class="form-group">--}}
            {{--<label for="type">type</label>--}}
            {{--<input id="type" name = "type" type="text" class="form-control" value="{!!$resource->--}}
            {{--type!!}"> --}}
        {{--</div>--}}
        {{--<div class="form-group">--}}
            {{--<label for="description">description</label>--}}
            {{--<input id="description" name = "description" type="text" class="form-control" value="{!!$resource->--}}
            {{--description!!}"> --}}
        {{--</div>--}}
        {{--<div class="checkbox">--}}
            {{--<label><input type="checkbox" name="requiresAuth" value="true">Requires Training</label>--}}
        {{--</div>--}}
        {{--<button class = 'btn btn-primary' type ='submit'>Update</button>--}}
    {{--</form>--}}


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

