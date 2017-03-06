@extends('scaffold-interface.layouts.app')
@section('title','Posts - Edit')
@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/post/{!!$post->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
    @endhasanyrole
@endsection
@section('content')
    <script src="{{url('/js/tinymce/tinymce.min.js')}}"></script>

    <script>tinymce.init({
            mode : "exact",
            elements : "body",
            height: 300,
            menubar: 'edit insert view format table tools'
        });
    </script>

<section class="content">
    <form method = 'get' action = '{!!url("post")!!}'>
        <button class = 'btn btn-danger'>post Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("post")!!}/{!!$post->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="posted_at">posted_at</label>
            <input id="posted_at" name = "posted_at" type="text" class="form-control" value="{!!$post->
            posted_at!!}"> 
        </div>
        <div class="form-group">
            <label for="title">title</label>
            <input id="title" name = "title" type="text" class="form-control" value="{!!$post->
            title!!}"> 
        </div>
        <div class="form-group">
            <label for="body">body</label>
            <input id="body" name = "body" type="text" class="form-control" value="{!!$post->
            body!!}"> 
        </div>
        <div class="form-group">
            <label for="image">image</label>
            <input id="image" name = "image" type="text" class="form-control" value="{!!$post->
            image->id!!}">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection