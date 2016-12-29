@extends('layouts.app')

@section('title')

    <h1>@if(!isset($post))
            Create Post
        @else
            Edit Post
        @endif
    </h1>

@endsection

@section('content')
    @if(!isset($post))
        {!! Form::open(['route'=>'posts.store'])!!}
    @else
        {!! Form::model($post,['method'=>'PUT','route'=>['posts.update',$post]])!!}
    @endif

    {!! Form::text('title') !!}
    {!! Form::textarea('body') !!}

    @include('bits.groupsSelector')

    <div class="form-group">
        {!! Form::submit('Submit',['class'=>'btn btn-primary col-md-2 col-sm-2','name'=>'submit']) !!}
        {!! Form::submit('Cancel',['class'=>'btn btn-danger col-md-2 col-sm-2','name'=>'submit']) !!}
    </div>
    {!! Form::close() !!}
@endsection