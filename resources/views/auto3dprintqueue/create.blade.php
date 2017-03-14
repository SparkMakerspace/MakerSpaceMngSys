@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create auto3dprintqueue
    </h1>

        <button class = 'btn btn-danger'>auto3dprintqueue Index</button>
        {!! Form::open(array('route' => 'auto3dprintqueue.store', 'files'=>true)) !!}
    {{csrf_field()}}
        <div class="form-group">
            <label>Select File</label>
            {!! Form::file('upload') !!}
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
    {!! Form::submit() !!}
    {!! Form::close() !!}
</section>
@endsection