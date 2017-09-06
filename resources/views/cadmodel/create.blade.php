@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create cadmodel
    </h1>
    <form method = 'get' action = '{!!url("cadmodel")!!}'>
        <button class = 'btn btn-danger'>cadmodel Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("cadmodel")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="Name">Name</label>
            <input id="Name" name = "Name" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="Description">Description</label>
            <input id="Description" name = "Description" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="ModelFile">ModelFile</label>
            <input id="ModelFile" name = "ModelFile" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="Material">Material</label>
            <input id="Material" name = "Material" type="text" class="form-control">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection