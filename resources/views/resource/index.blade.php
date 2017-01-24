@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Resource Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("resource")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New resource</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>name</th>
            <th>location</th>
            <th>type</th>
            <th>description</th>
            <th>Requires Training</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($resources as $resource) 
            <tr>
                <td>{!!$resource->name!!}</td>
                <td>{!!$resource->location!!}</td>
                <td>{!!$resource->type!!}</td>
                <td>{!!$resource->description!!}</td>
                <td>@if($resource->requiresAuth) Yes @else No @endif</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/resource/{!!$resource->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/resource/{!!$resource->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/resource/{!!$resource->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $resources->render() !!}

</section>
@endsection