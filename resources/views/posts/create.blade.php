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
        {!! BootForm::open(['route'=>'posts.store'])!!}
    @else
        {!! BootForm::open(['model'=>$post,'update'=>'posts.update'])!!}
    @endif

    {!! BootForm::text('title','Post Title') !!}
    {!! BootForm::textarea('body','Post Body') !!}

    @include('bits.groupsSelector')
@endsection

@section('footer')
    <div class="form-group">
        {!! BootForm::submit('Submit',['class'=>'btn btn-primary col-md-2 col-sm-2','name'=>'submit']) !!}
        {!! BootForm::submit('Cancel',['class'=>'btn btn-danger col-md-2 col-sm-2','name'=>'submit']) !!}
    </div>
    {!! BootForm::close() !!}
@endsection