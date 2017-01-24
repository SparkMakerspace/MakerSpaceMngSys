@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show resource_type
    </h1>
    <br>
    <form method = 'get' action = '{!!url("resource_type")!!}'>
        <button class = 'btn btn-primary'>resource_type Index</button>
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
                    <b><i>value : </i></b>
                </td>
                <td>{!!$resource_type->value!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection