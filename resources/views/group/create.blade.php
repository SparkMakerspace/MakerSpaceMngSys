@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create group
    </h1>
    <form method = 'get' action = '{!!url("g")!!}'>
        <button class = 'btn btn-danger'>group Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("g")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="name">name</label>
            <input id="name" name = "name" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="stub">stub</label>
            <input id="stub" name = "stub" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="about">about</label>
            <input id="about" name = "about" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="image">image</label>
            <input id="image" name = "image" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="visibility">visibility</label>
            <input id="visibility" name = "visibility" type="text" class="form-control">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection