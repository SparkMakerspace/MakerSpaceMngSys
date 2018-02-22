@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

            <h1>Chorelist Index</h1>
            <a class = 'col s3' href= '{{url("chorelist")}}/'>
                <button class = 'btn btn-primary' type = 'submit'>Index</button>
            </a>
            <a class = 'col s3' href= '{{url("chorelist")}}/create'>
                <button class = 'btn btn-primary' type = 'submit'>Create New Chorelist</button>
            </a>
            <a class = 'col s3' href= '{{url("chorelist/completed")}}'>
                <button class = 'btn btn-primary' type = 'submit'>Completed Tasks</button>
            </a>
            <br>
            
            <br>
            <table class = "table table-striped table-bordered">
                <thead>
                    
                    <th>ChoreName</th>
                    
                    <th>RequireDate</th>
                    
                    <th>CompletedDate</th>
                    
                    <th>CreatorID</th>
                    
                    <th>CompleterID</th>
                    
                    <th>ChoreDescription</th>
                    
                    <th>HoursREQD</th>
                    
                    
                    <th>actions</th>
                </thead>
                <tbody>
                    @foreach($chorelists as $Chorelist)
                    <tr>
                        
                        <td>
                            <a href = '/chorelist/{{$Chorelist->id}}/ididit' class = 'viewEdit btn btn-primary btn-xs' ><i class = 'material-icons'>I Did It</i></a>
                            {{$Chorelist->ChoreName}}</td>
                        
                        <td>{{$Chorelist->RequireDate}}</td>
                        
                        <td>{{$Chorelist->CompletedDate}}</td>
                        
                        <td>{{$Chorelist->CreatorID}}</td>
                        
                        <td>{{$Chorelist->CompleterID}}</td>
                        
                        <td>{{$Chorelist->ChoreDescription}}</td>
                        
                        <td>{{$Chorelist->HoursREQD}}</td>
                        
                        
                        <td>
                                <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/chorelist/{{$Chorelist->id}}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                                <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/chorelist/{{$Chorelist->id}}/edit'><i class = 'material-icons'>edit</i></a>
                                <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/chorelist/{{$Chorelist->id}}'><i class = 'material-icons'>info</i></a>
                        </td>
                    </tr>
                    @endforeach
                </tbody>
            </table>

@endsection
