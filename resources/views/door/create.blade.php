@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create door
    </h1>
    <form method = 'get' action = '{!!url("door")!!}'>
        <button class = 'btn btn-danger'>door Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("door")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="name">name</label>
            <input id="name" name="name" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="sundayOpen">sundayOpen</label>
            <input id="sundayOpen" name = "sundayOpen" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="sundayClose">sundayClose</label>
            <input id="sundayClose" name = "sundayClose" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="mondayOpen">mondayOpen</label>
            <input id="mondayOpen" name = "mondayOpen" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="mondayClose">mondayClose</label>
            <input id="mondayClose" name = "mondayClose" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="tuesdayOpen">tuesdayOpen</label>
            <input id="tuesdayOpen" name = "tuesdayOpen" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="tuesdayClose">tuesdayClose</label>
            <input id="tuesdayClose" name = "tuesdayClose" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="wednesdayOpen">wednesdayOpen</label>
            <input id="wednesdayOpen" name = "wednesdayOpen" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="wednesdayClose">wednesdayClose</label>
            <input id="wednesdayClose" name = "wednesdayClose" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="thursdayOpen">thursdayOpen</label>
            <input id="thursdayOpen" name = "thursdayOpen" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="thursdayClose">thursdayClose</label>
            <input id="thursdayClose" name = "thursdayClose" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="fridayOpen">fridayOpen</label>
            <input id="fridayOpen" name = "fridayOpen" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="fridayClose">fridayClose</label>
            <input id="fridayClose" name = "fridayClose" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="saturdayOpen">saturdayOpen</label>
            <input id="saturdayOpen" name = "saturdayOpen" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="saturdayClose">saturdayClose</label>
            <input id="saturdayClose" name = "saturdayClose" type="text" class="form-control">
        </div>
        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection