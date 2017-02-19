@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit comment
    </h1>
    <form method = 'get' action = '{!!url("comment")!!}'>
        <button class = 'btn btn-danger'>comment Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("comment")!!}/{!!$comment->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="commented_at">commented_at</label>
            <input id="commented_at" name = "commented_at" type="text" class="form-control" value="{!!$comment->
            commented_at!!}">
        </div>
        <div class="form-group">
            <label for="title">title</label>
            <input id="title" name = "title" type="text" class="form-control" value="{!!$comment->
            title!!}"> 
        </div>
        <div class="form-group">
            <label for="body">body</label>
            <input id="body" name = "body" type="text" class="form-control" value="{!!$comment->
            body!!}"> 
        </div>
        <div class="form-group">
            <label for="image">image</label>
            <input id="image" name = "image" type="text" class="form-control" value="{!!$comment->
            image!!}"> 
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection