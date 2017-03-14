@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create auto3dprintercolor
    </h1>
    <form method = 'get' action = '{!!url("auto3dprintercolor")!!}'>
        <button class = 'btn btn-danger'>auto3dprintercolor Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("auto3dprintercolor")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="color">color</label>
            <input id="color" name = "color" type="text" class="form-control">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection