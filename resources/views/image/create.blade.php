@extends('scaffold-interface.layouts.app')

@section('title','Images')

@section('content')
    <section class="content">
        <h1>
            Upload New Image
        </h1>
        {!! Form::open(array('route' => 'image.store', 'files'=>true)) !!}
            {{csrf_field()}}
            {!! Form::file('upload') !!}
            {!! Form::submit() !!}
        {!! Form::close() !!}
    </section>
@endsection