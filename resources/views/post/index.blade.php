@extends('scaffold-interface.layouts.app')
@section('title','Posts - Index')
@section('content')

<section class="content">
    <h1>
        Post Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("post")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New post</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>posted_at</th>
            <th>title</th>
            <th>body</th>
            <th>image</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($posts as $post) 
            <tr>
                <td>{!!$post->posted_at!!}</td>
                <td>{!!$post->title!!}</td>
                <td>{!!$post->body!!}</td>
                <td>{!!$post->image->path!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/post/{!!$post->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/post/{!!$post->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/post/{!!$post->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $posts->render() !!}

</section>
@endsection