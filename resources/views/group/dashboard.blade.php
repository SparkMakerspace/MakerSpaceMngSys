@extends('scaffold-interface.layouts.app')

@section('title')
    {{$group->name}}
@endsection

@section('content')




    this is the text
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
                        <div class="col-sm-10 row">
                            <div class="col-md-8">
                                <h1>
                                    {{$group->name}}
                                </h1>
                                <p>
                                    {!!nl2br($group->about)!!}
                                </p>
                            </div>
                            <div class="col-md-4" style="border: solid thin">
                                <h4>
                                    Contact Info
                                </h4>
                                <p>
                                    {!! nl2br($group->contactInfo) !!}
                                </p>
                            </div>
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
                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
                    Launch demo modal
                </button>

                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title" id="myModalLabel">Modal title</h4>
                            </div>
                            <div class="modal-body">
                                @include('post.editClean')
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Posts Box -->
                <div class="box-body">
                    <ul class="products-list">
                        @foreach($posts as $post)
                            <li class="list-group-item">
                                @if($post->image()->first())
                                    <div class="product-img">
                                        <img src="{{url($post->image()->first()->path)}}">
                                    </div>
                                @endif
                                <span class="pull-right">
                                    {{$post->getOwner()->name}}
                                </span>
                                <div class="product-info" style="margin-left: 0px">
                                    <h3>{{$post->title}}</h3>
                                </div>
                                <div>
                                    {!! $post->getExcerpt()!!}
                                </div>
                            </li>
                        @endforeach
                    </ul>
                    {!! $posts->links() !!}
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