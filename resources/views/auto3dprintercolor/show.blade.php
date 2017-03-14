@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show auto3dprintercolor
    </h1>
    <br>
    <form method = 'get' action = '{!!url("auto3dprintercolor")!!}'>
        <button class = 'btn btn-primary'>auto3dprintercolor Index</button>
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
                    <b><i>color : </i></b>
                </td>
                <td>{!!$auto3dprintercolor->color!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection