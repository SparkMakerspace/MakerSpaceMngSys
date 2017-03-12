@extends('scaffold-interface.layouts.app')
@section('title','Post - Edit')
@section('content')

    <script src="{{url('/js/tinymce/tinymce.min.js')}}"></script>

    <script>
        tinymce.init({
            selector: '#body',
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | break',
            content_css: '//www.tinymce.com/css/codepen.min.css',
            setup: function (editor) {
                editor.addButton('break', {
                    text: 'Insert Break',
                    icon: false,
                    onclick: function () {
                        editor.insertContent('!!BREAK!!');
                    }
                });
            },
            file_browser_callback : function(field_name, url, type, win) {

                // from http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
                var w = window,
                    d = document,
                    e = d.documentElement,
                    g = d.getElementsByTagName('body')[0],
                    x = w.innerWidth || e.clientWidth || g.clientWidth,
                    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

                var cmsURL = '{!! url('RichFilemanager/index.html')!!}?&field_name='+field_name;

                if(type == 'image') {
                    cmsURL = cmsURL + "&type=images";
                }

                tinyMCE.activeEditor.windowManager.open({
                    file : cmsURL,
                    title : 'Filemanager',
                    width : x * 0.8,
                    height : y * 0.8,
                    resizable : "yes",
                    close_previous : "no"
                });

            }
        })
    </script>

    <section class="content">
        <h1>
            {{$title}}
        </h1>
        <form method = 'get' action = '{!!url("post")!!}'>
            <button class = 'btn btn-danger'>Post Index</button>
        </form>
        <br>

        @if(isset($post))
            {!! Form::model($post, ['action' => ['PostController@update', $post->id]]) !!}
        @else
            {!! Form::open(['action' => 'PostController@store']) !!}
        @endif
        <div class="form-group">
            {!! Form::label('title', 'Title:') !!}
            {!! Form::text('title',null,['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::label('body', 'Body:') !!}
            {!! Form::textarea('body',null,['class'=>'form-control']) !!}
        </div>
        <div class="form-group">
            {!! Form::label('posted_at','Publish post at:') !!}
            @include('partials.datePicker',['fieldName'=>'posted_at'])
        </div>
        <div class="form-group">
            {!! Form::label('group','Post in groups:') !!}
            @if(isset($post))
                @include('partials.groupSelector',['selectedGroups'=>$post->groups])
            @else
                @include('partials.groupSelector')
            @endif
        </div>


        <div class="form-group">
            {!! Form::submit('Submit') !!}
        </div>

        <script>
            $(function () {
                $('#posted_at').datetimepicker({
                    format: 'YYYY-MM-DD HH:mm'
                });
            });
        </script>


        {!! Form::close() !!}
    </section>
@endsection

@section('adminBar')
    @hasanyrole(['superadmin','admin'])
    @if(isset($post))
        <form class = 'col s3' method = 'get' action = '{!!url("g")!!}/create'>
            <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/post/{!!$post->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
            <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/post/{!!$post->id!!}/edit'><i class = 'material-icons'>edit</i></a>
            <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/post/{!!$post->id!!}'><i class = 'material-icons'>info</i></a>
        </form>
    @endif
    @endhasanyrole
@endsection