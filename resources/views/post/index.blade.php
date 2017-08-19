@extends('scaffold-interface.layouts.app')
@section('title','Posts - Index')
@section('content')

<section class="content">
    <h1>
        Post Index
    </h1>
    <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
        Create A New Post
    </button>

    <!-- Modal -->
    <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">

                <div class="modal-body">
                    @include('post.editClean')
                </div>

            </div>
        </div>
    </div>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>posted_at</th>
            <th>title</th>
            <th>body</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($posts as $post) 
            <tr>
                <td>{!!$post->posted_at!!}</td>
                <td>{!!$post->title!!}</td>
                <td>{!!$post->body!!}</td>
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