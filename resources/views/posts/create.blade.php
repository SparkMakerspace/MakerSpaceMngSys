@extends('layouts.generalpage')

@section('title')
    <h1>Create Post</h1>
@endsection

@section('mainContent')
    {!! BootForm::open(['model'=>$post,'store'=>'posts.store'])!!}
    {!! BootForm::text('title','Post Title','',['class'=>'focus']) !!}
    {!! BootForm::textarea('body','Post Body') !!}
@endsection

@section('footer')
    <div class="form-group">
        {!! BootForm::submit('Submit',['class'=>'btn btn-primary col-md-2 col-sm-2','name'=>'submit']) !!}
        {!! BootForm::submit('Cancel',['class'=>'btn btn-danger col-md-2 col-sm-2','name'=>'submit']) !!}
    </div>
    {!! BootForm::close() !!}
@endsection