    <section class="content">

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
            {!! Form::wysiwyg('body',null,['class'=>'form-control'],true) !!}
        </div>
        <div class="form-group">
            {!! Form::label('posted_at','Publish post at:') !!}
            @include('partials.datePicker',['fieldName'=>'posted_at'])
        </div>
        <div class="form-group">
            {!! Form::label('group','Post in groups:') !!}
            @if(isset($post))
                {!! Form::groups('group[]' ,$post->groups) !!}
            @else
                {!! Form::groups() !!}
            @endif
        </div>


        <div class="form-group">
            {!! Form::submit('Submit') !!}
        </div>

        {!! Form::close() !!}
    </section>



    @if(App\User::isAdmin(Auth::user()))
        @if(isset($post))
            <form class = 'col s3' method = 'get' action = '{!!url("g")!!}/create'>
                <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/post/{!!$post->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/post/{!!$post->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/post/{!!$post->id!!}'><i class = 'material-icons'>info</i></a>
            </form>
        @endif
    @endif

