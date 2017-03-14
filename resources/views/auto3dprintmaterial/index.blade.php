@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Auto3dprintmaterial Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("auto3dprintmaterial")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New auto3dprintmaterial</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>material</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($auto3dprintmaterials as $auto3dprintmaterial) 
            <tr>
                <td>{!!$auto3dprintmaterial->material!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/auto3dprintmaterial/{!!$auto3dprintmaterial->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/auto3dprintmaterial/{!!$auto3dprintmaterial->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/auto3dprintmaterial/{!!$auto3dprintmaterial->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $auto3dprintmaterials->render() !!}

</section>
@endsection