@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit calendar
    </h1>
    <form method = 'get' action = '{!!url("calendar")!!}'>
        <button class = 'btn btn-danger'>calendar Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("calendar")!!}/{!!$calendar->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="name">name</label>
            <input id="name" name = "name" type="text" class="form-control" value="{!!$calendar->
            name!!}"> 
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection