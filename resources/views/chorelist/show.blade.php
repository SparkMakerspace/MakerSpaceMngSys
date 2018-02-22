@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')
        <div class = 'container'>
            <h1>Show Chorelist</h1>
            <br>
            <form method = 'get' action = '{{url("chorelist")}}'>
                <button class = 'btn btn-primary'>Chorelist Index</button>
            </form>
            <br>
            <table class = 'table table-bordered'>
                <thead>
                    <th>Key</th>
                    <th>Value</th>
                </thead>
                <tbody>

                    
                    <tr>
                        <td>
                            <b><i>ChoreName : </i></b>
                        </td>
                        <td>{{$chorelist->ChoreName}}</td>
                    </tr>
                    
                    <tr>
                        <td>
                            <b><i>RequireDate : </i></b>
                        </td>
                        <td>{{$chorelist->RequireDate}}</td>
                    </tr>
                    
                    <tr>
                        <td>
                            <b><i>CompletedDate : </i></b>
                        </td>
                        <td>{{$chorelist->CompletedDate}}</td>
                    </tr>
                    
                    <tr>
                        <td>
                            <b><i>CreatorID : </i></b>
                        </td>
                        <td>{{$chorelist->CreatorID}}</td>
                    </tr>
                    
                    <tr>
                        <td>
                            <b><i>CompleterID : </i></b>
                        </td>
                        <td>{{$chorelist->CompleterID}}</td>
                    </tr>
                    
                    <tr>
                        <td>
                            <b><i>ChoreDescription : </i></b>
                        </td>
                        <td>{{$chorelist->ChoreDescription}}</td>
                    </tr>
                    
                    <tr>
                        <td>
                            <b><i>HoursREQD : </i></b>
                        </td>
                        <td>{{$chorelist->HoursREQD}}</td>
                    </tr>
                    

                        
                </tbody>
            </table>
        </div>
@endsection