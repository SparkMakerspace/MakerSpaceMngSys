@extends('scaffold-interface.layouts.app')
@section('title','Post - View')
@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/post/{!!$post->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/post/{!!$post->id!!}/edit'><i class = 'material-icons'>edit</i></a>
    @endhasanyrole
@endsection
@section('content')

<section class="content">

    <br>
    <form method = 'get' action = '{!!url("post")!!}'>
        <button class = 'btn btn-primary'>post Index</button>
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
                    <b><i>posted_at : </i></b>
                </td>
                <td>{!!$post->posted_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>title : </i></b>
                </td>
                <td>{!!$post->title!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>body : </i></b>
                </td>
                <td>{!!$post->body!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>image : </i></b>
                </td>
                <td>{!!$post->image!!}</td>
            </tr>
        </tbody>

    </table>
    @include('partials.Comments',['commentable'=>$post])
</section>
@endsection