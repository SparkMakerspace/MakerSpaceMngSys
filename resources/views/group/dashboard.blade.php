@extends('scaffold-interface.layouts.app')
@section('title')
    {{$group->name}}
@endsection
@section('content')
    <div class="container row">
        <div class="col-sm-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    What's Goin on in {{$group->name}}
                </div>
                <div class="panel-body">
                    {!! $calendar->calendar() !!}
                    {!! $calendar->script() !!}
                </div>
            </div>
        </div>
    </div>

@endsection

@push('jquery.ready')
$('[data-toggle="popover"]').popover();
@endpush