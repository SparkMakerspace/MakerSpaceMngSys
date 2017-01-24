@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit resource
    </h1>
    <form method = 'get' action = '{!!url("resource")!!}'>
        <button class = 'btn btn-danger'>resource Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("resource")!!}/{!!$resource->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="name">name</label>
            <input id="name" name = "name" type="text" class="form-control" value="{!!$resource->
            name!!}"> 
        </div>
        <div class="form-group">
            <label for="location">location</label>
            <input id="location" name = "location" type="text" class="form-control" value="{!!$resource->
            location!!}"> 
        </div>
        <div class="form-group">
            <label for="type">type</label>
            <input id="type" name = "type" type="text" class="form-control" value="{!!$resource->
            type!!}"> 
        </div>
        <div class="form-group">
            <label for="description">description</label>
            <input id="description" name = "description" type="text" class="form-control" value="{!!$resource->
            description!!}"> 
        </div>
        <div class="checkbox">
            <label><input type="checkbox" name="requiresAuth" value="true">Requires Training</label>
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection