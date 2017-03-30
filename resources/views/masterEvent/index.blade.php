@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Event Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("event/master")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New event</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>name</th>
            <th>startDateTime</th>
            <th>endDateTime</th>
            <th>description</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($events as $event) 
            <tr>
                <td>{!!$event->name!!}</td>
                <td>{!!$event->startDateTime!!}</td>
                <td>{!!$event->endDateTime!!}</td>
                <td>{!!$event->description!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/event/master/{!!$event->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/event/master/{!!$event->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/event/master/{!!$event->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $events->render() !!}

</section>
@endsection