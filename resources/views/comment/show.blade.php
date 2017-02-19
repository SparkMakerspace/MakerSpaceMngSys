@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show comment
    </h1>
    <br>
    <form method = 'get' action = '{!!url("comment")!!}'>
        <button class = 'btn btn-primary'>comment Index</button>
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
                    <b><i>commented_at : </i></b>
                </td>
                <td>{!!$comment->commented_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>title : </i></b>
                </td>
                <td>{!!$comment->title!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>body : </i></b>
                </td>
                <td>{!!$comment->body!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>image : </i></b>
                </td>
                <td>{!!$comment->image!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection