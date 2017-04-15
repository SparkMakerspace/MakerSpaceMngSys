@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

<section class="content">
    <h1>
        Edit sitenavigation
    </h1>
    <form method = 'get' action = '{!!url("sitenavigation")!!}'>
        <button class = 'btn btn-danger'>sitenavigation Index</button>
    </form>
    <br>
    @if(isset($sitenavigation))
        {!! Form::model($sitenavigation, ['action' => ['SitenavigationController@update', $sitenavigation->id]]) !!}
    @else
        {!! Form::open(['action' => 'SitenavigationController@store']) !!}
    @endif

        <div class="form-group">
            <label for="LinkText">LinkText</label>
            {!!  Form::text('LinkText')!!}
        </div>
        <div class="form-group">
            <label for="LinkImage">LinkImage</label>
            {!!  Form::imageselector('LinkImage')!!}
        </div>
        <div class="form-group">
            <label for="LinkLoginReqd">LinkLoginReqd</label>
            {!!  Form::text('LinkLoginReqd')!!}
        </div>
        <div class="form-group">
            <label for="LinkURL">LinkURL</label>
            {!!  Form::text('LinkURL')!!}
        </div>
        <div class="form-group">
            <label for="LinkDescription">LinkDescription</label>
            {!!  Form::text('LinkDescription')!!}
        </div>
        <button class = 'btn btn-primary' type ='submit'>Update</button>
    {!! Form::close() !!}
</section>
@endsection