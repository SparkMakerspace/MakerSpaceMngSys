@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show group
    </h1>
    <br>
    <form method = 'get' action = '{!!url("group")!!}'>
        <button class = 'btn btn-primary'>group Index</button>
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
                <td>{!!$group->name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>stub : </i></b>
                </td>
                <td>{!!$group->stub!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>about : </i></b>
                </td>
                <td>{!!$group->about!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>image : </i></b>
                </td>
                <td>{!!$group->image!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>contactUser : </i></b>
                </td>
                <td>{!!$group->contactUser!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>visibility : </i></b>
                </td>
                <td>{!!$group->visibility!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection