@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show event
    </h1>
    <br>
    <form method = 'get' action = '{!!url("event")!!}'>
        <button class = 'btn btn-primary'>event Index</button>
    </form>
    <br>
    <table class = 'table table-bordered'>
        <thead>
            <th>Key</th>
            <th>Value</th>
        </thead>
        <tbody>
            <tr>
                <td>
                    <b><i>name : </i></b>
                </td>
                <td>{!!$event->name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>startDateTime : </i></b>
                </td>
                <td>{!!$event->startDateTime!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>endDateTime : </i></b>
                </td>
                <td>{!!$event->endDateTime!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>description : </i></b>
                </td>
                <td>{!!$event->description!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>groups : </i></b>
                </td>
                <td>@foreach($event->groups()->get() as $group)
                {{$group->id}}
                @endforeach</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection