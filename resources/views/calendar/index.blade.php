@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Calendar Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("calendar")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New calendar</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>name</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($calendars as $calendar) 
            <tr>
                <td>{!!$calendar->name!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/calendar/{!!$calendar->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/calendar/{!!$calendar->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/calendar/{!!$calendar->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $calendars->render() !!}

</section>
@endsection