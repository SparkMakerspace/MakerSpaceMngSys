@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        {{$title}}
    </h1>
    <form method = 'get' action = '{!!url("sitepage")!!}'>
        <button class = 'btn btn-danger'>sitepage Index</button>
    </form>
    <br>

    @if(isset($sitepage))
        {!! Form::model($sitepage, ['action' => ['SitepageController@update', $sitepage->id]]) !!}
    @else
        {!! Form::open(['action' => 'SitepageController@store']) !!}
    @endif

    <div class="form-group">
        {!! Form::label('PageTitle', 'Title:') !!}
        {!!  Form::text('PageTitle',null,['class'=>'form-control'])!!}
    </div>
    <div class="form-group">
        {!! Form::label('PageContent', 'Content:') !!}
        {!!  Form::wysiwyg('PageContent',null,['class'=>'form-control'])!!}
    </div>
    <div class="form-group">
        {!! Form::label('PagePublishDate', 'Publish Date:') !!}
        {!!  Form::date('PagePublishDate',null,['class'=>'form-control'])!!}
    </div>
    <div class="form-group">
        {!! Form::label('PageStub', 'Page Stub (spark.ccop/thisisastub):') !!}
        {!!  Form::text('PageStub',null,['class'=>'form-control'])!!}
    </div>
    <div class="form-group">
        {!! Form::label('PageCSS', 'Put your specific CSS here (we use Bootstrap 3 already):') !!}
        {!!  Form::text('PageCSS',null,['class'=>'form-control'])!!}
    </div>
    <div class="form-group">
        {!! Form::label('PageJavaScript', 'Put your needed javascript here:') !!}
        {!!  Form::text('PageJavaScript',null,['class'=>'form-control'])!!}
    </div>

    <div class="form-group">
        {!! Form::label('PageKeywords', 'Page Keywords:') !!}
        {!! Form::text('PageKeywords',null,['class'=>'form-control']) !!}
    </div>

    <div class="form-group">
        {!! Form::submit($submit) !!}
    </div>

    {!! Form::close() !!}
</section>
@endsection