@extends('scaffold-interface.layouts.app')
@section('title','Calender and events')
@section('content')

<section class="content">
    <form class = 'col s3' method = 'get' action = '{!!url("event")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New event</button>
    </form>


    <div class="col-md-6">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">
                    Calendar
                </h3>
            </div>
            <div class="box-body">
                {!! $calendar->calendar() !!}
                {!! $calendar->script() !!}
            </div><!-- /.box-body -->
        </div>
    </div>

    <div class="col-md-6">
        <div class="box">
            <div class="box-header with-border">
                <h3 class="box-title">
                    Calendar List
                </h3>
            </div>
            <div class="box-body">
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
                                <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/event/{!!$event->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                                <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/event/{!!$event->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                                <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/event/{!!$event->id!!}'><i class = 'material-icons'>info</i></a>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div><!-- /.box-body -->
        </div>
    </div>
</section>
@endsection