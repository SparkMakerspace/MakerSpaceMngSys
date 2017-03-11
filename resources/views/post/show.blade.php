@extends('scaffold-interface.layouts.app')
@section('title','Post - View')
@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/post/{!!$post->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/post/{!!$post->id!!}/edit'><i class = 'material-icons'>edit</i></a>
    @endhasanyrole
@endsection
@section('content')

    <section class="content">

        <br>
        <div class="panel panel-default">
            <div class="panel-heading">
                <div class="row">
                    <div class="col-md-8">
                        <h3>
                            {!! $post->title !!}
                        </h3>
                    </div>
                    <div class="col-md-4">
                        <div class="visible-sm visible-xs">
                            <h4>
                                <small>
                                    <b>Posted by: </b>{!! $post->getOwner()->name !!}
                                    <br>
                                    <b>Posted at: </b>{!! $post->posted_at !!}
                                    @if($post->created_at != $post->updated_at)
                                        <br>
                                        <b>Updated at: </b>{!! $post->updated_at !!}
                                    @endif
                                </small>
                            </h4>
                        </div>
                        <div class="hidden-sm hidden-xs pull-right">
                            <h4>
                                <small>
                                    <b>Posted by: </b>{!! $post->getOwner()->name !!}
                                    <br>
                                    <b>Posted at: </b>{!! $post->posted_at !!}
                                    @if($post->created_at != $post->updated_at)
                                        <br>
                                        <b>Updated at: </b>{!! $post->updated_at !!}
                                    @endif
                                </small>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel-body">
                {!! $post->getBody() !!}
            </div>
        </div>

        @include('partials.Comments',['commentable'=>$post])
    </section>
@endsection