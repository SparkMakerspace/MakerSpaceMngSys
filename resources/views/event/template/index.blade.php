@extends('scaffold-interface.layouts.app')
@section('title','Event Templates')
@section('content')

    <section class="content">
        <div class="col-md-3">
            <form class = 'col s3' method = 'get' action = '{!!url("event/template/create")!!}'>
                <button class = 'btn btn-primary' type = 'submit'>Create new event template</button>
            </form>
        </div>
        
        <br>
        <br>

        <div class="col-md-12">
            <br>
            <p>
                Event Templates are used to create events that could be instantiated multiple times.
                Examples:
            <ul><li>An event such as an orientation for a workstation would be scheduled multiple times.</li>
                <li>A yearly social event.</li>
                <li>All classes must be created as event templates.</li>
            </ul>
            </p>
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">
                        Templates
                    </h3>
                </div>
                <div class="box-body">
                    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
                        <thead>
                        <th>name</th>
                        <th>type</th>
                        <th>status</th>
                        <th>owners</th>
                        <th>actions</th>
                        </thead>
                        <tbody>
                        @foreach($events as $event)
                            <tr>
                                <td>{!!$event->name!!}</td>
                                <td>{!!$event->type !!}</td>
                                <td>{!! $event->status !!}</td>
                                <td>@foreach($event->owners() as $owner)
                                    {{$owner->name}}<br>
                                    @endforeach</td>
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