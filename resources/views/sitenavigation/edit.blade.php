@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

    <section class="content">
        <h1>
            Edit Sitenavigation
        </h1>

        <br>
        @if(isset($Sitenavigation))
            {!! Form::model($Sitenavigation, ['action' => ['SitenavigationController@update', $Sitenavigation->id]]) !!}
        @else
            {!! Form::open(['action' => 'SitenavigationController@store']) !!}
        @endif

        <div class="row">
            <div class="col-md-6 form-group">
                <label for="LinkText">Title / LinkText</label>
                {!!  Form::text('LinkText',null,['class'=>'form-control'])!!}
            </div>
            <div class="col-md-6 form-group">
                <label for="LinkDescription">LinkDescription</label>
                {!!  Form::text('LinkDescription',null,['class'=>'form-control'])!!}
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 form-group">
                <label for="LinkImage">Thumbnail</label>
                {!!  Form::imageselector('LinkImage')!!}
            </div>
            <div class="col-md-6 form-group">
                <label for="LinkLoginReqd">LinkLoginReqd</label>
                {!!  Form::text('LinkLoginReqd',null,['class'=>'form-control'])!!}
            </div>
        </div>
        <div class="row">
            <div class="col-md-6 form-group">
                <label for="LinkURL">URL / Stub</label>
                {!!  Form::text('LinkURL',null,['class'=>'form-control'])!!}
            </div>
            <div class="col-md-6 form-group">
                {!! Form::label('PagePublishDate', 'Publish Date:') !!}
                {!!  Form::date('PagePublishDate',null,['class'=>'form-control'])!!}
            </div>
        </div>


        <div class="col-md-12 form-group">
            {!! Form::label('PageContent', 'Content:') !!}
            {!!  Form::wysiwyg('PageContent',null,['class'=>'form-control'])!!}
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


        <button class='btn btn-primary' type='submit'>Submit</button>
        {!! Form::close() !!}
    </section>




@endsection



