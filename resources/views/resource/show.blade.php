@extends('scaffold-interface.layouts.app')
@section('title','Equipment and Resources - Show')
@section('content')

<section class="content">
    <h1>
        Show resource
    </h1>
    <br>
    <form method = 'get' action = '{!!url("resource")!!}'>
        <button class = 'btn btn-primary'>resource Index</button>
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
                <td>{!!$resource->name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>location : </i></b>
                </td>
                <td>{!!$resource->location!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>type : </i></b>
                </td>
                <td>{!!\App\resource_type::findOrfail($resource->type)->value!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>description : </i></b>
                </td>
                <td>{!!$resource->description!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>requiresAuth : </i></b>
                </td>
                <td>{!!$resource->requiresAuth!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection