@extends('scaffold-interface.layouts.app')
@section('title','Event Templates')
@section('content')

    <section class="content">
        @can('create event templates')
        <div class="col-md-3">
            <form class = 'col s3' method = 'get' action = '{!!url("event/template/create")!!}'>
                <button class = 'btn btn-primary' type = 'submit'>Create new event template</button>
            </form>
        </div>
        @endcan

        <br>
        <br>
        <div class="col-md-12">
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
                        <th>description</th>
                        <th>instructor</th>
                        <th>actions</th>
                        </thead>
                        <tbody>
                        @foreach($events as $event)
                            <tr>
                                <td>{!!$event->name!!}</td>
                                <td>{!!$event->description!!}</td>
                                <td>{!! $event->instructor->name !!}</td>
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