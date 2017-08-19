@extends('scaffold-interface.layouts.app')
@section('title','Post - View')
@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    <a data-toggle="modal" data-target="#myModal" class='delete btn btn-danger btn-xs'
       data-link="/post/{!!$post->id!!}/deleteMsg"><i class='material-icons'>delete</i></a>
    <a href='#' class='viewEdit btn btn-primary btn-xs' data-link='/post/{!!$post->id!!}/edit'><i
                class='material-icons'>edit</i></a>
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
                        <A href= {{$post->getOwner()->UserUrl()}}>
                            <img src="{{url($post->getOwner()->image->path)}}" style="max-width: 50px;  height: auto;"
                                 alt="User Image">
                            {{$post->getOwner()->name }}<br>
                        </A>

                        <br>
                        <b>Posted at: </b>{!! $post->posted_at !!}
                        @if($post->created_at != $post->updated_at)
                            <br>
                            <b>Updated at: </b>{!! $post->updated_at !!}
                        @endif


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