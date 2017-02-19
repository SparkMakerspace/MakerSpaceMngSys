@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create comment
    </h1>
    <form method = 'get' action = '{!!url("comment")!!}'>
        <button class = 'btn btn-danger'>comment Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("comment")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="body">body</label>
            <input id="body" name = "body" type="text" class="form-control">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection