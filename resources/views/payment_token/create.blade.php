@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create payment_token
    </h1>
    <a href="{!!url('payment_token')!!}" class = 'btn btn-danger'><i class="fa fa-home"></i> Payment_token Index</a>
    <br>
    <form method = 'POST' action = '{!!url("payment_token")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="token">token</label>
            <input id="token" name = "token" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="selected">selected</label>
            <input id="selected" name = "selected" type="text" class="form-control">
        </div>
        <button class = 'btn btn-success' type ='submit'> <i class="fa fa-floppy-o"></i> Save</button>
    </form>
</section>
@endsection