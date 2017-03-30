@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create chore_list
    </h1>
    <form method = 'get' action = '{!!url("chore_list")!!}'>
        <button class = 'btn btn-danger'>chore_list Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("chore_list")!!}'>
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
            <label for="CompletedByUser">CompletedByUser</label>
            <input id="CompletedByUser" name = "CompletedByUser" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="TaskTimeReqd">TaskTimeReqd</label>
            <input id="TaskTimeReqd" name = "TaskTimeReqd" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="image">image</label>
            <input id="image" name = "image" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="NeedDate">NeedDate</label>
            <input id="NeedDate" name = "NeedDate" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label>resources Select</label>
            <select name = 'resource_id' class = 'form-control'>
                @foreach($resources as $key => $value) 
                <option value="{{$key}}">{{$value}}</option>
                @endforeach 
            </select>
        </div>
        <div class="form-group">
            <label>users Select</label>
            <select name = 'user_id' class = 'form-control'>
                @foreach($users as $key => $value) 
                <option value="{{$key}}">{{$value}}</option>
                @endforeach 
            </select>
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection