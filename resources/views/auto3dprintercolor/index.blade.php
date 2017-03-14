@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Auto3dprintercolor Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("auto3dprintercolor")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New auto3dprintercolor</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>color</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($auto3dprintercolors as $auto3dprintercolor) 
            <tr>
                <td>{!!$auto3dprintercolor->color!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/auto3dprintercolor/{!!$auto3dprintercolor->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/auto3dprintercolor/{!!$auto3dprintercolor->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/auto3dprintercolor/{!!$auto3dprintercolor->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $auto3dprintercolors->render() !!}

</section>
@endsection