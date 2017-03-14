@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit auto3dprintcue
    </h1>
    <form method = 'get' action = '{!!url("auto3dprintcue")!!}'>
        <button class = 'btn btn-danger'>auto3dprintcue Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!! url("auto3dprintcue")!!}/{!!$auto3dprintcue->
        id!!}/update'> 
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="Name">Name</label>
            <input id="Name" name = "Name" type="text" class="form-control" value="{!!$auto3dprintcue->
            Name!!}"> 
        </div>
        <div class="form-group">
            <label for="Infill">Infill</label>
            <input id="Infill" name = "Infill" type="range"  min="20" max="100"  oninput="InfillOutput.value = Infill.value +'%'" value="{!!$auto3dprintcue->
            Infill!!}">
            <output name="InfillOutput" id="InfillOutput">{!!$auto3dprintcue->Infill!!}%</output>
        </div>
        <div class="form-group">
            <label for="Status">Status</label>
            <input id="Status" name = "Status" type="text" class="form-control" value="{!!$auto3dprintcue->
            Status!!}"> 
        </div>
        <div class="form-group">
            <label for="Notified">Notified</label>
            <input id="Notified" name = "Notified" type="text" class="form-control" value="{!!$auto3dprintcue->
            Notified!!}"> 
        </div>
        <div class="form-group">
            <label>auto3dprintercolors Select</label>
            <select name = 'auto3dprintercolor_id' class = "form-control">
                @foreach($auto3dprintercolors as $key => $value) 
                <option value="{{$key}}">{{$value}}</option>
                @endforeach 
            </select>
        </div>
        <div class="form-group">
            <label>auto3dprintmaterials Select</label>
            <select name = 'auto3dprintmaterial_id' class = "form-control">
                @foreach($auto3dprintmaterials as $key => $value) 
                <option value="{{$key}}">{{$value}}</option>
                @endforeach 
            </select>
        </div>
        <div class="form-group">
            <label>users Select</label>
            <select name = 'user_id' class = "form-control">
                @foreach($users as $key => $value) 
                <option value="{{$key}}">{{$value}}</option>
                @endforeach 
            </select>
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    </form>
</section>
@endsection