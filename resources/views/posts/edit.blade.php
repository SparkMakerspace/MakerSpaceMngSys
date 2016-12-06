@extends('layouts.app')

@section('title')
    <h1>Edit Post</h1>
@endsection

@section('content')
    {!! BootForm::open(['model'=>$post,'update'=>'posts.update'])!!}
    {!! BootForm::text('title','Post Title') !!}
    {!! BootForm::textarea('body','Post Body',null,['class'=>'focus']) !!}
@endsection

@section('footer')
    <div class="form-group">
        {!! BootForm::submit('Submit',['class'=>'btn btn-primary col-md-2 col-sm-2','name'=>'submit']) !!}
        {!! BootForm::submit('Cancel',['class'=>'btn btn-danger col-md-2 col-sm-2','name'=>'submit']) !!}
    </div>
    {!! BootForm::close() !!}
@endsection