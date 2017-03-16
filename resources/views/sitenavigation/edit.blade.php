@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit sitenavigation
    </h1>
    <form method = 'get' action = '{!!url("sitenavigation")!!}'>
        <button class = 'btn btn-danger'>sitenavigation Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("sitenavigation")!!}/{!!$sitenavigation->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="LinkText">LinkText</label>
            <input id="LinkText" name = "LinkText" type="text" class="form-control" value="{!!$sitenavigation->
            LinkText!!}"> 
        </div>
        <div class="form-group">
            <label for="LinkImage">LinkImage</label>
            <input id="LinkImage" name = "LinkImage" type="text" class="form-control" value="{!!$sitenavigation->
            LinkImage!!}"> 
        </div>
        <div class="form-group">
            <label for="LinkLoginReqd">LinkLoginReqd</label>
            <input id="LinkLoginReqd" name = "LinkLoginReqd" type="text" class="form-control" value="{!!$sitenavigation->
            LinkLoginReqd!!}"> 
        </div>
        <div class="form-group">
            <label for="LinkURL">LinkURL</label>
            <input id="LinkURL" name = "LinkURL" type="text" class="form-control" value="{!!$sitenavigation->
            LinkURL!!}"> 
        </div>
        <div class="form-group">
            <label for="LinkDescription">LinkDescription</label>
            <input id="LinkDescription" name = "LinkDescription" type="text" class="form-control" value="{!!$sitenavigation->
            LinkDescription!!}"> 
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection