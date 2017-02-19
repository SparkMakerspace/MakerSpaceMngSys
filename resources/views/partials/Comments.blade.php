@extends('scaffold-interface.layouts.app')
{{--

Drop down selector for a user.
NOTE: cannot be instantiated more than once in the same form.

Optional Parameters:
    $name: name of this instance
        else, field name is "user"
    $label: label for this instance
        else, field label is "Select User"
    $selectedUser: the default selection
        else, no user selected
    $users: collection of users to select from
        else, all users selectable
--}}

@php

    if(isset($id) & isset($type))
    {
        $comments = App\Comment::where([['commentable_type','=',$type], ['commentable_id','=',$id]])->get();
    }

@endphp

<!-- Construct the box with style you want. Here we are using box-danger -->
<!-- Then add the class direct-chat and choose the direct-chat-* contexual class -->
<!-- The contextual class should match the box, so we are using direct-chat-danger -->




<div class="box box-danger direct-chat direct-chat-danger">
    <div class="box-header with-border">
        <h3 class="box-title">Comments </h3>
        <div class="box-tools pull-right">
            <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
        </div>
    </div><!-- /.box-header -->
    <div class="box-body">
        <!-- Conversations are loaded here -->
        <div >

            @foreach($comments  as $comment)
            <div class="direct-chat-msg">
                <div class="direct-chat-info clearfix">
                    <span class="direct-chat-name pull-left">{{$comment->user->where('id', $id)->pluck('name')}}</span>
                    <span class="direct-chat-timestamp pull-right">{{ $comment->created_at }}</span>
                </div><!-- /.direct-chat-info -->
                <img class="direct-chat-img" src="../dist/img/user1-128x128.jpg" alt="message user image"><!-- /.direct-chat-img -->
                <div class="direct-chat-text">
                    {{ $comment->body}}
                </div><!-- /.direct-chat-text -->
            </div><!-- /.direct-chat-msg -->
            @endforeach

        </div><!-- /.box-body -->
    <div class="box-footer">

            <form method = 'POST' action = '{!!url("comment")!!}' class="input-group">
                <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
                <input type = 'hidden' name = 'id' value = '{{$id}}'>
                <input type = 'hidden' name = 'type' value = '{{$type}}'>
                <input type="text" name="body" placeholder="Type Message ..." class="form-control">
                <span class="input-group-btn">
                    <button class = 'btn btn-primary' type ='submit' class="btn btn-danger btn-flat">Create</button>
                </span>
            </form>

    </div><!-- /.box-footer-->
</div><!--/.direct-chat -->






















    @can('create comments')
            <textarea rows="4" cols="50">
            </textarea>
    @endif
