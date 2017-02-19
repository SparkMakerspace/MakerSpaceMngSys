@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Comment Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("comment")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New comment</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>commented_at</th>
            <th>title</th>
            <th>body</th>
            <th>image</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($comments as $comment)
            <tr>
                <td>{!!$comment->commented_at!!}</td>
                <td>{!!$comment->title!!}</td>
                <td>{!!$comment->body!!}</td>
                <td>{!!$comment->image!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/comment/{!!$comment->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/comment/{!!$comment->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/comment/{!!$comment->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $comments->render() !!}

</section>
@endsection