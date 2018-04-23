@extends('scaffold-interface.layouts.app')
@section('title','Calendar and events')
@section('content')

    <section class="content">
            <div class="col-md-3">
            <form class = 'col s3' method = 'get' action = '{!!url("event/create")!!}'>
                <button class = 'btn btn-primary' type = 'submit'>Create new one-off event</button>
            </form>
        </div>
        <div class="col-md-3">
            <form class = 'col s3' method = 'get' action = '{!!url("event/template")!!}'>
                <button class = 'btn btn-primary' type = 'submit'>Event Templates</button>
            </form>
        </div>
        <div class="col-md-6">
        @if(Request::query('past'))
            <form class = 'col s3' method = 'get' action = '{!!url("event")!!}'>
                <button class = 'btn btn-default pull-right' type = 'submit'>Showing past events only</button>
            </form>
        @else
            <form class = 'col s3' method = 'get' action = '{!!url("event")!!}'>
                <input type='hidden' name='past' value='true' />
                <button class = "btn btn-primary pull-right" type = "submit">Showing future events only</button>
            </form>
        @endif
        </div>
        <br>


        <br>
        <div class="col-md-6">
            @include('partials.calendar')
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