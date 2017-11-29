@extends('scaffold-interface.layouts.app')
@section('title','Groups')
@section('content')

<section class="content">
@include('partials.groupList')

    @hasanyrole(['superadmin','admin'])
    <h1>
        Group Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("g")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New group</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>name</th>
            <th>stub</th>
            <th>about</th>
            <th>image</th>
            <th>contactUser</th>
            <th>visibility</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($groups as $group) 
            <tr>
                <td>{!!$group->name!!}</td>
                <td>{!!$group->stub!!}</td>
                <td>{!!$group->about!!}</td>
                <td><img src="{!!$group->image->path!!}"></td>
                <td>{!!$group->contactUser!!}</td>
                <td>{!!$group->visibility!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/g/{!!$group->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/g/{!!$group->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/g/{!!$group->stub!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $groups->render() !!}
    @endhasanyrole


</section>
@endsection


@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    <form class = 'col s3' method = 'get' action = '{!!url("g")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New group</button>
    </form>
    @endhasanyrole
@endsection