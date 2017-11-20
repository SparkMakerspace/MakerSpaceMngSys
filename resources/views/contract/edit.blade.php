@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit contract
    </h1>
    <a href="{!!url('contract')!!}" class = 'btn btn-primary'><i class="fa fa-home"></i> Contract Index</a>
    <br>
    <form method = 'POST' action = '{!! url("contract")!!}/{!!$contract->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="text">Contract Text</label>
            @include('partials.wysiwyg',['name'=>'text','value'=>$contract->text])
        </div>
        <div class="form-group">
            <label for="revision">Contract Revision Number</label>
            <input id="revision" name = "revision" type="text" class="form-control" value="{!!$contract->
            revision!!}"> 
        </div>
        <button class = 'btn btn-success' type ='submit'><i class="fa fa-floppy-o"></i> Update</button>
    </form>
</section>
@endsection