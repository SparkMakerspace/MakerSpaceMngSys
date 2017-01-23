@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create calendar
    </h1>
    <form method = 'get' action = '{!!url("calendar")!!}'>
        <button class = 'btn btn-danger'>calendar Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("calendar")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="name">name</label>
            <input id="name" name = "name" type="text" class="form-control">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection