@extends('scaffold-interface.layouts.app')
@section('title','Group - Edit')
@section('content')
<script src="{{url('/js/tinymce/tinymce.min.js')}}"></script>

<script>tinymce.init({
        mode : "exact",
        elements : "about",
        height: 500,
        menubar: 'edit insert view format table tools'
    });
</script>



<section class="content">
    <h1>
        Edit group
    </h1>
    <form method = 'get' action = '{!!url("g")!!}'>
        <button class = 'btn btn-danger'>group Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("g")!!}/{!!$group->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="name">name</label>
            <input id="name" name = "name" type="text" class="form-control" value="{!!$group->name!!}">
        </div>
        <div class="form-group">
            <label for="stub">stub</label>
            <input id="stub" name = "stub" type="text" class="form-control" value="{!!$group->
            stub!!}"> 
        </div>
        <div class="form-group">
            <label for="about">about</label>
            <textarea  id="about" name = "about" type="text" class="form-control" value="{!!$group->
            about!!}"></textarea>
        </div>
        <div class="form-group">
            <label for="image">image</label>
            <input id="image" name = "image" type="text" class="form-control" value="{!!$group->
            image->id!!}">
        </div>

        <div class="form-group">
            <label for="visibility">visibility</label>
            <input id="visibility" name = "visibility" type="text" class="form-control" value="{!!$group->
            visibility!!}"> 
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection