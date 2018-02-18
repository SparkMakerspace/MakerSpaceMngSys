@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Chore_list Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("chore_list")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New chore_list</button>
    </form>
    <br>
    <div class="dropdown">
        <button class="btn btn-default dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true"> Associate <span class="caret"></span> </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenu1">
            <li><a href='{{url('resource')}}'>Resource</a></li>
            <li><a href='{{url('user')}}'>User</a></li>
        </ul>
    </div>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>Name</th>
            <th>Description</th>
            <th>CompletedByUser</th>
            <th>TaskTimeReqd</th>
            <th>image</th>
            <th>NeedDate</th>
            <th>name</th>
            <th>location</th>
            <th>type</th>
            <th>description</th>
            <th>requiresAuth</th>
            <th>created_at</th>
            <th>updated_at</th>
            <th>deleted_at</th>
            <th>name</th>
            <th>email</th>
            <th>password</th>
            <th>remember_token</th>
            <th>created_at</th>
            <th>updated_at</th>
            <th>username</th>
            <th>address1</th>
            <th>address2</th>
            <th>city</th>
            <th>state</th>
            <th>zipcode</th>
            <th>phone</th>
            <th>active</th>
            <th>accountType</th>
            <th>bio</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($chore_lists as $chore_list) 
            <tr>
                <td>{!!$chore_list->Name!!}</td>
                <td>{!!$chore_list->Description!!}</td>
                <td>{!!$chore_list->CompletedByUser!!}</td>
                <td>{!!$chore_list->TaskTimeReqd!!}</td>
                <td>{!!$chore_list->image!!}</td>
                <td>{!!$chore_list->NeedDate!!}</td>

                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/chore_list/{!!$chore_list->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/chore_list/{!!$chore_list->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/chore_list/{!!$chore_list->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $chore_lists->render() !!}

</section>
@endsection