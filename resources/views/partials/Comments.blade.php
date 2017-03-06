{{--

Required Parameter:
    $commentable: Commentable instance

--}}

<div class="box box-default direct-chat direct-chat-danger container">
    <div class="box-header with-border">
        <h3 class="box-title">Comments </h3>
        <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
        </div>
    </div><!-- /.box-header -->
    <div class="box-body">
        <!-- Conversations are loaded here -->
        <div >

            @foreach($commentable->comments  as $comment)
                <div class="direct-chat-msg">
                    <div class="direct-chat-info clearfix">
                        <span class="direct-chat-name pull-left">{{$comment->user()->first()->username}}</span>
                        <span class="direct-chat-timestamp pull-right">{{ $comment->created_at }}</span>
                    </div><!-- /.direct-chat-info -->
                    <img class="direct-chat-img" src="{{url($comment->user()->first()->image->path)}}" alt="{{$comment->user()->first()->username}}"><!-- /.direct-chat-img -->
                    <div class="direct-chat-text">
                        {{ $comment->body}}
                    </div><!-- /.direct-chat-text -->
                </div><!-- /.direct-chat-msg -->
            @endforeach

        </div><!-- /.box-body -->
        @can('create comments')
            <div class="box-footer">

                {!! Form::open(['url'=>'comment']) !!}
                {!! Form::hidden('type',get_class($commentable)) !!}
                {!! Form::hidden('id',$commentable->id) !!}
                {!! Form::text('body', null, ['class'=>'form-control','placeholder'=>'Type Message...']) !!}
                {!! Form::submit('Create',['class'=>'btn btn-primary btn-flat']) !!}
                {!! Form::close() !!}

            </div><!-- /.box-footer-->
        @endcan
    </div><!--/.direct-chat -->
</div>
