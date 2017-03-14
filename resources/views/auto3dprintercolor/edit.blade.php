@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit auto3dprintercolor
    </h1>
    <form method = 'get' action = '{!!url("auto3dprintercolor")!!}'>
        <button class = 'btn btn-danger'>auto3dprintercolor Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("auto3dprintercolor")!!}/{!!$auto3dprintercolor->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="color">color</label>
            <input id="color" name = "color" type="text" class="form-control" value="{!!$auto3dprintercolor->
            color!!}"> 
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection