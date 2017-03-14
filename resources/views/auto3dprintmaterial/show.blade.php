@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show auto3dprintmaterial
    </h1>
    <br>
    <form method = 'get' action = '{!!url("auto3dprintmaterial")!!}'>
        <button class = 'btn btn-primary'>auto3dprintmaterial Index</button>
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
                    <b><i>material : </i></b>
                </td>
                <td>{!!$auto3dprintmaterial->material!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection