@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Door Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("door")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New door</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>name</th>
            <th>locked</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($doors as $door) 
            <tr>
                <td>{!! $door->name !!}</td>
                <td>@if(!$door->unlocked) <i class="fa fa-check" style="color:green"></i>
                    @else <i class="fa fa-times" style="color:red"></i> @endif </td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/door/{!!$door->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/door/{!!$door->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/door/{!!$door->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $doors->render() !!}

</section>
@endsection