@extends('scaffold-interface.layouts.app')
@section('title','Posts - Create')
@section('content')

<section class="content">
    <h1>
        Create post
    </h1>
    <form method = 'get' action = '{!!url("post")!!}'>
        <button class = 'btn btn-danger'>post Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("post")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="posted_at">posted_at</label>
            <input id="posted_at" name = "posted_at" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="title">title</label>
            <input id="title" name = "title" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="body">body</label>
            <input id="body" name = "body" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="image">image</label>
            <input id="image" name = "image" type="text" class="form-control">
        </div>
        @include('partials.groupSelector')
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection