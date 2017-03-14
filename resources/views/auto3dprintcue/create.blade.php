@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create auto3dprintcue
    </h1>
    <form method = 'get' action = '{!!url("auto3dprintcue")!!}' enctype="multipart/form-data">
        <button class = 'btn btn-danger'>auto3dprintcue Index</button>
    </form>
    <br>
    <form method = 'POST' action = '{!!url("auto3dprintcue")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <div class="form-group">
            <label for="Name">Name</label>
            <input id="Name" name = "Name" type="text" class="form-control">
        </div>
        <div class="form-group">
            <label for="Infill">Infill</label>
            <input id="Infill" name = "Infill" type="range"  min="20" max="100"  oninput="InfillOutput.value = Infill.value +'%'" value="20">
            <output name="InfillOutput" id="InfillOutput">20%</output>
        </div>
        <div class="form-group">
            <label>auto3dprintercolors Select</label>
            <select name = 'auto3dprintercolor_id' class = 'form-control'>
                @foreach($auto3dprintercolors as $key => $value) 
                <option value="{{$key}}">{{$value}}</option>
                @endforeach 
            </select>
        </div>
        <div class="form-group">
            <label>auto3dprintmaterials Select</label>
            <select name = 'auto3dprintmaterial_id' class = 'form-control'>
                @foreach($auto3dprintmaterials as $key => $value) 
                <option value="{{$key}}">{{$value}}</option>
                @endforeach 
            </select>
        </div>
        <div class="form-group">
            <label>Upload File</label>
            {!! Form::file('upload') !!}
        </div>



        <button class = 'btn btn-primary' type ='submit'>Create</button>
    </form>
</section>
@endsection