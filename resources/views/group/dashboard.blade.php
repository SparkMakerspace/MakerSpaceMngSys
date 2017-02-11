@extends('scaffold-interface.layouts.app')
@section('title')
    {{$group->name}}
@endsection
@section('content')
    <div class="row">
        <div class="col-md-6 col-sm-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="text-center">What's Goin On</h3>
                </div>
                <div class="panel-body">
                    {!! $calendar->calendar() !!}
                    {!! $calendar->script() !!}
                </div>
            </div>
        </div>
    </div>

@endsection