@extends('scaffold-interface.layouts.app')
@section('title','Post - View')
@section('content')

<section class="content">
    <h1>
        <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/post/{!!$post->id!!}/edit'><i class = 'material-icons'>edit</i></a>
    </h1>
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
</section>
    @include('partials.Comments',['commentable'=>$post])
@endsection