@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit resource_type
    </h1>
    <form method = 'get' action = '{!!url("resource_type")!!}'>
        <button class = 'btn btn-danger'>resource_type Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("resource_type")!!}/{!!$resource_type->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="value">value</label>
            <input id="value" name = "value" type="text" class="form-control" value="{!!$resource_type->
            value!!}"> 
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection