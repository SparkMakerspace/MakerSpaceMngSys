@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-8 col-md-offset-2">
            <div class="panel panel-default">

                <div class="panel-heading">Dashboard</div>

                <div class="panel-body">
                    @php($user = Auth::user())
                    <h4>Hello, {{$user->name}}.</h4>
                    <p>
                        You can manage all of your membership settings here.
                    </p>
                    <hr>
                    {!! BootForm::open(['model'=>$user,'update'=>'users.update']) !!}
                    {!! BootForm::text('name','Name') !!}
                    {!! BootForm::email('email','Email Address') !!}
                    {!! BootForm::password('password','Password',['placeholder'=>'Leave blank to keep un-changed','id'=>'password']) !!}
                    {!! BootForm::password('confirm_password','Confirm Password',['disabled','id' => 'confirm_password']) !!}
                    <div class="form-group row">
                        <div>{!! BootForm::submit('Submit',['class'=>'btn btn-primary col-md-2 col-sm-2 ','name'=>'submit']) !!}</div>
                        <div>{!! BootForm::submit('Cancel',['class'=>'btn btn-danger col-md-2 col-sm-2','name'=>'submit']) !!}</div>
                    </div>
                    {!! BootForm::close() !!}
                    <hr>
                    <h4>You indicated interest in these workstations:</h4>
                    <div class="row">
                        <div class="col-lg-6">
                            <ul class="list-inline">
                                @foreach($topicConnections->workstationConnections as $topic)
                                    <li class="list-group-item hover">
                                        {{$topic->topic->name}}
                                    </li>
                                @endforeach
                            </ul>
                        </div>
                        <div class="col-md-5 pull-right"><h5>(You can change these by clicking here)</h5></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('postJquery')
    @parent
    //<script> //This is here for IDE syntax highlighting
        $('#password').keyup(function () {
            if($('#password').val() == '') {
                $('#confirm_password').attr("disabled");
            } else {
                $('#confirm_password').removeAttr("disabled");
            }
            });
@endsection