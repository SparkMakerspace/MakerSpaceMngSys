@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

    <section class="content">
        <h1>
            Edit auto3dprintqueue
        </h1>
        <form method='get' action='{!!url("auto3dprintqueue")!!}'>
            <button class='btn btn-danger'>auto3dprintqueue Index</button>
        </form>
        <br>
        <form method='POST' action='{!! url("auto3dprintqueue")!!}/{!!$auto3dprintqueue->
        id!!}/update'>
            <input type='hidden' name='_token' value='{{Session::token()}}'>
            <div class="form-group">
                <label for="Name">Name</label>
                {!!$auto3dprintqueue->Name!!}
            </div>



            <div class="form-group">
                <label>Generate Support</label>
                {{Form::select('genenerateSupport', array('1' => 'on', '0' => 'off'), $auto3dprintqueue->genenerateSupport)}}
            </div>

            <div class="form-group">
                <label for="Infill">Infill</label>
                <input id="Infill" name="Infill" type="range" min="20" max="100"
                       oninput="InfillOutput.value = Infill.value +'%'" value="{!!$auto3dprintqueue->
            Infill!!}">
                <output name="InfillOutput" id="InfillOutput">{!!$auto3dprintqueue->Infill!!}%</output>
            </div>
            <div class="form-group">
                <label for="Status">Status</label>
                {!!$auto3dprintqueue->Status!!}
            </div>


            <div class="form-group">
                <label>auto3dprintmaterials Select</label>
                <select name='auto3dprintmaterial_id' class="form-control">
                    @foreach($auto3dprintmaterials as $key => $value)
                        <option value="{{$key}}">{{$value}}</option>
                    @endforeach
                </select>
            </div>

            <button class='btn btn-primary' type='submit'>Update</button>
        </form>
    </section>
@endsection