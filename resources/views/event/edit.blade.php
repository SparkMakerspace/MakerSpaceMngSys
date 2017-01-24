@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit event
    </h1>
    <form method = 'get' action = '{!!url("event")!!}'>
        <button class = 'btn btn-danger'>event Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("event")!!}/{!!$event->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="name">name</label>
            <input id="name" name = "name" type="text" class="form-control" value="{!!$event->
            name!!}"> 
        </div>
        <div class="form-group">
            <label for="startDateTime">startDateTime</label>
            <input id="startDateTime" name = "startDateTime" type="text" class="form-control" value="{!!$event->
            startDateTime!!}"> 
        </div>
        <div class="form-group">
            <label for="endDateTime">endDateTime</label>
            <input id="endDateTime" name = "endDateTime" type="text" class="form-control" value="{!!$event->
            endDateTime!!}"> 
        </div>
        <div class="form-group">
            <label for="description">description</label>
            <input id="description" name = "description" type="text" class="form-control" value="{!!$event->
            description!!}"> 
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection