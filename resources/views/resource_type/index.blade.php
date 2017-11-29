@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Resource_type Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("resource_type")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New resource_type</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>value</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($resource_types as $resource_type) 
            <tr>
                <td>{!!$resource_type->value!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/resource_type/{!!$resource_type->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/resource_type/{!!$resource_type->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/resource_type/{!!$resource_type->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $resource_types->render() !!}

</section>
@endsection