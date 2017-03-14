@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Auto3dprintcue Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("auto3dprintcue")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New auto3dprintcue</button>
    </form>
    <br>
    <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> Associate <span class="caret"></span> </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href="http://makerspacemngsys.dev/auto3dprintercolor">Auto3dprintercolor</a></li>
            <li><a href="http://makerspacemngsys.dev/auto3dprintmaterial">Auto3dprintmaterial</a></li>
        </ul>
    </div>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>Name</th>
            <th>Infill</th>
            <th>Status</th>
            <th>Notified</th>
            <th>color</th>
            <th>material</th>
            <th>name</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($auto3dprintcues as $auto3dprintcue) 
            <tr>
                <td>{!!$auto3dprintcue->Name!!}</td>
                <td>{!!$auto3dprintcue->Infill!!}</td>
                <td>{!!$auto3dprintcue->Status!!}</td>
                <td>{!!$auto3dprintcue->Notified!!}</td>
                <td>{!!$auto3dprintcue->auto3dprintercolor->color!!}</td>
                <td>{!!$auto3dprintcue->auto3dprintmaterial->material!!}</td>
                <td>{!!$auto3dprintcue->user->name!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/auto3dprintcue/{!!$auto3dprintcue->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/auto3dprintcue/{!!$auto3dprintcue->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/auto3dprintcue/{!!$auto3dprintcue->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $auto3dprintcues->render() !!}

</section>
@endsection