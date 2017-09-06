@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Cadmodel Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("cadmodel")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New cadmodel</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>Name</th>
            <th>Description</th>
            <th>Material</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($cadmodels as $cadmodel) 
            <tr>
                <td>
                    <a href = '/cadmodel/{!!$cadmodel->id!!}/edit'>
                    {!!$cadmodel->Name!!}</a></td>
                <td>{!!$cadmodel->Description!!}</td>
                <td>{!!$cadmodel->Material!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/cadmodel/{!!$cadmodel->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/cadmodel/{!!$cadmodel->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/cadmodel/{!!$cadmodel->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $cadmodels->render() !!}

</section>
@endsection