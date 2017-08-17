@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')


    <section class="content">
        <h1>
            3D Printer Queue - Yes, you must wait in line. Yes, it might take longer than the DMV.
        </h1>
        <div style="float: left;">
            <form class='col s3' method='get' action='{!!url("auto3dprintqueue")!!}/create'>
                <button class='btn btn-primary' type='submit'>Upload a new file to be printed!</button>
            </form>
        </div>
        <div style="float: left;">
            <form class='col s3' method='get' action='{!!url("auto3dprintqueueall")!!}'>
                <button class='btn btn-primary' type='submit'>Show files From users</button>
                <input id="id" name="id" type="hidden" class="form-control">
            </form>
        </div>
        <hr>
        <div style="width: 100%;">
            <br>
            <div class="dropdown">
                <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="true"> Associate <span class="caret"></span></button>
                <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">

                    <li><a href="{!! url('auto3dprintmaterial') !!}">Auto3dprintmaterial</a></li>
                </ul>
            </div>
            <br>

            <div  class="table table-bordered table-hover">
                <table id='list3d' class="table table-bordered table-hover">
                    <thead>
                    <th>Name</th>
                    <th>Infill<br>Status<br>material</th>
                    <th>name</th>
                    <th>actions</th>
                    </thead>
                    <tbody>
                    @foreach($auto3dprintqueues as $auto3dprintqueue)
                        <tr>
                            <td>

                                <a href="{!! url('auto3dprintqueue/'.$auto3dprintqueue->id) !!}">
                                <img src="{!! url('auto3dprintqueue/'.$auto3dprintqueue->id.'/thumb.png') !!}" style="width:100px;height:100px;">
                                    <div>{!!$auto3dprintqueue->Name!!}
                                    <br>
                                    Status: {!!$auto3dprintqueue->Status!!}
                                    </div>
                                </a>
                            </td>
                            <td>Infill: {!!$auto3dprintqueue->Infill!!}<br>

                            Material: {!!$auto3dprintqueue->auto3dprintmaterial->material!!}
                            </td>

                            <td>{!!$auto3dprintqueue->user->name!!}</td>
                            <td><div class="btn-group-vertical">
                                <a data-toggle="modal" data-target="#myModal" class='delete btn btn-danger btn-xs'
                                   data-link="/auto3dprintqueue/{!!$auto3dprintqueue->id!!}/deleteMsg"><i
                                            class='material-icons'>delete</i></a>
                                <a data-toggle="modal" data-target="#myModal" class='viewShow btn btn-warning btn-xs'
                                   data-link='/auto3dprintqueue/{!!$auto3dprintqueue->id!!}?printnow=true'><i
                                            class='material-icons'>Aprove</i></a>
                                </div>
                            </td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>
        </div>
        {!! $auto3dprintqueues->render() !!}

    </section>


@endsection
