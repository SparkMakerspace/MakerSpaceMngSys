@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show cadmodel
    </h1>
    <br>
    <form method = 'get' action = '{!!url("cadmodel")!!}'>
        <button class = 'btn btn-primary'>cadmodel Index</button>
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
                    <b><i>Name : </i></b>
                </td>
                <td>{!!$cadmodel->Name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>Description : </i></b>
                </td>
                <td>{!!$cadmodel->Description!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>ModelFile : </i></b>
                </td>
                <td>{!!$cadmodel->ModelFile!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>Material : </i></b>
                </td>
                <td>{!!$cadmodel->Material!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection