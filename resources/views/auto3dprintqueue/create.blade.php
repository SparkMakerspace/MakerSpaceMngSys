@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')


<section class="content">
    <h1>
        Upload a new file to the print queue
    </h1>

        <a href="./" class = 'btn btn-danger'>auto3dprintqueue Index</a>
        {!! Form::open(array('route' => 'auto3dprintqueue.store', 'files'=>true)) !!}
    {{csrf_field()}}
        <div class="form-group">
            <label>Select File</label>
            {!! Form::file('upload', ['accept' =>'.stl']) !!}
        </div>
        <div class="form-group">
            <label for="Infill">Infill</label>
            <input id="Infill" name = "Infill" type="range" style="width:50%" min="20" max="100"  oninput="InfillOutput.value = Infill.value +'%'" value="20">
            <output name="InfillOutput" id="InfillOutput">20%</output>
        </div>

        <div class="form-group">
            <label>Select Material</label>
            <select name = 'auto3dprintmaterial_id' class = 'form-control' style="width:50%">
                @foreach($auto3dprintmaterials as $key => $value) 
                <option value="{{$key}}">{{$value}}</option>
                @endforeach 
            </select>
        </div>
    {!! Form::submit() !!}
    {!! Form::close() !!}
</section>
@endsection