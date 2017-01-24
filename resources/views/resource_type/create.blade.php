@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create resource_type
    </h1>
    <form method = 'get' action = '{!!url("resource_type")!!}'>
        <button class = 'btn btn-danger'>resource_type Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("resource_type")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="value">value</label>
            <input id="value" name = "value" type="text" class="form-control">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection