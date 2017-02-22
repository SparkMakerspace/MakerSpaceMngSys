@extends('scaffold-interface.layouts.app')
@section('title')
    {{$group->name}}
@endsection
@section('content')
    <div class="container row">
        <div class="col-sm-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div style="display: inline-block">
                        <img src="{{Storage::url($group->image()->first()->path)}}" alt="{!!$group->name!!}" style="max-height: 200px;" >
                    </div>
                    <div style="display: inline-block">
                        {!!$group->about!!}
                    </div>
                </div>

                <div class="panel-body">
                    {!! $calendar->calendar() !!}
                    {!! $calendar->script() !!}
                </div>
            </div>
        </div>
    </div>

@endsection

@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/g/{!!$group->id!!}/edit'><i class = 'material-icons'>edit</i></a>
    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/g/{!!$group->stub!!}'><i class = 'material-icons'>info</i></a>
    @endhasanyrole
@endsection

@push('jquery.ready')
$('[data-toggle="popover"]').popover();
@endpush