@extends('layouts.app')

@section('title')
    <h1>{{$post->title}}<small><small> by
        @if ($post->userExists())
            {{$post->user->name}}
        @else
            Deleted User
        @endif</small></small></h1>
    <div class="row">
    @can('update',$post)
        <form action="{{ URL::route('posts.edit',$post) }}" method="GET" class="col-md-3 col-sm-3 pull-right">
                <button class="btn btn-info">
                    Edit
                </button>
        </form>
    @endcan
    @can('delete',$post)
        <form action="{{ URL::route('posts.destroy',$post) }}" method="POST" class="col-md-3 col-sm-3 pull-right">
                <input type="hidden" name="_method" value="DELETE">
                <input type="hidden" name="_token" value="{{ csrf_token() }}">
                <button class="btn btn-danger">
                    Delete
                </button>
        </form>
    @endcan
    </div>
@endsection

@section('content')
    {{--Posts List--}}
    <div class="list-group">
        <div class="list-group-item row">
                <!-- Post Body -->
                <div class="list-group-item-text">
                    {!! html_entity_decode($post->body) !!}
                </div>
        </div>
    </div>
@endsection

@section('footer')
    {!! BootForm::open(['method'=>'GET','route'=>'posts.index']) !!}
    {!! BootForm::submit('Back',['class'=>'btn'])!!}
    {!! BootForm::close() !!}
@endsection