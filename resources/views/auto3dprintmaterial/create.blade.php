@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create auto3dprintmaterial
    </h1>
    <form method = 'get' action = '{!!url("auto3dprintmaterial")!!}'>
        <button class = 'btn btn-danger'>auto3dprintmaterial Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("auto3dprintmaterial")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="material">material</label>
            <input id="material" name = "material" type="text" class="form-control">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection