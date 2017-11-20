@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create contract
    </h1>
    <a href="{!!url('contract')!!}" class = 'btn btn-danger'><i class="fa fa-home"></i> Contract Index</a>
    <br>
    <form method = 'POST' action = '{!!url("contract")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <hr>
            <label for="text">Contract Text</label>
            @include('partials.wysiwyg',['name'=>'text'])
        </div>
        <div class="form-group">
            <label for="revision">Contract Revision Number</label>
            <input id="revision" name = "revision" type="text" class="form-control">
        </div>
        <button class = 'btn btn-success' type ='submit'> <i class="fa fa-floppy-o"></i> Save</button>
    </form>
</section>
@endsection