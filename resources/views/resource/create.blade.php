@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create resource
    </h1>
    <form method = 'get' action = '{!!url("resource")!!}'>
        <button class = 'btn btn-danger'>resource Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("resource")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="name">name</label>
            <input id="name" name = "name" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="location">location</label>
            <input id="location" name = "location" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="type">type</label>
            <input id="type" name = "type" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="description">description</label>
            <input id="description" name = "description" type="text" class="form-control">
        </div>
        <div class="checkbox">
            <label for="requiresAuth">
            <input id="requiresAuth" name = "requiresAuth" type="checkbox" class="checkbox">requiresAuth</label>
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection