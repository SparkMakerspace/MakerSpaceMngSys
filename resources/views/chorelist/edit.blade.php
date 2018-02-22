@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

            <h1>Edit Chorelist</h1>
            <form method = 'get' action = '{{url("chorelist")}}'>
                <button class = 'btn btn-danger'>Chorelist Index</button>
            </form>
            <br>
            <form method = 'POST' action = '{{url("chorelist")}}/{{$chorelist->id}}/update'>
                <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
                
                <div class="form-group">
                    <label for="ChoreName">ChoreName</label>
                    <input id="ChoreName" name = "ChoreName" type="text" class="form-control" value="{{$chorelist->ChoreName}}">
                </div>
                
                <div class="form-group">
                    <label for="RequireDate">RequireDate</label>
                    <input id="RequireDate" name = "RequireDate" type="text" class="form-control" value="{{$chorelist->RequireDate}}">
                </div>
                

                
                <div class="form-group">
                    <label for="ChoreDescription">ChoreDescription</label>
<textarea id="ChoreDescription" name = "ChoreDescription" type="text" class="form-control">
{{$chorelist->ChoreDescription}}
</textarea>
                </div>
                
                <div class="form-group">
                    <label for="HoursREQD">HoursREQD</label>
                    <input id="HoursREQD" name = "HoursREQD" type="text" class="form-control" value="{{$chorelist->HoursREQD}}">
                </div>
                
                
                <button class = 'btn btn-primary' type ='submit'>Update</button>
            </form>

@endsection
