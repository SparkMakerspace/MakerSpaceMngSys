@extends('scaffold-interface.layouts.app')

@section('title')
    {{$group->name}}
@endsection

@section('content')
    <div class="container row">
        <br>
        <div class="col-sm-12">
            <div class="box box-primary">
                <div class="box-header with-border">
                    <div class="row">
                        <div class="col-sm-2">
                            @if ($group->image_id != null)
                                <img src="{{url(asset($group->image->path))}}" alt="{!!$group->name!!}">
                            @else
                                <img src="{{url(asset(App\Image::whereName('groupNoImage.svg')->first()->path))}}" alt="{!! $group->name !!}">
                            @endif
                        </div>
                        <div class="col-sm-10">
                            <h1>
                                {{$group->name}}
                            </h1>
                            <p>
                                {!!$group->about!!}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">
                        Calendar
                    </h3>
                </div>
                <div class="box-body">
                    {!! $calendar->calendar() !!}
                    {!! $calendar->script() !!}
                </div><!-- /.box-body -->
            </div>
        </div>
        <div class="col-md-6">
            <div class="box">
                <div class="box-header with-border">
                    <h3 class="box-title">
                        Posts
                    </h3>
                </div>
                <div class="box-body">
                    <ul class="products-list">
                        @foreach($posts as $post)
                        <li class="item">
                            <div class="product-img">
                                <img src="{{url($post->image()->first()->path)}}">
                            </div>
                            <div class="product-info">
                                {{$post->title}}
                                <span class="pull-right">
                                    {{$post->users()->first()->name}}
                                </span>
                            </div>
                            <div class="product-description">

                            </div>
                        </li>
                        @endforeach
                    </ul>
                </div><!-- /.box-body -->
            </div>
        </div>
    </div>

@endsection

@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/g/{!!$group->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/g/{!!$group->id!!}/edit'><i class = 'material-icons'>edit</i></a>
    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/g/{!!$group->stub!!}'><i class = 'material-icons'>info</i></a>
    @endhasanyrole
@endsection