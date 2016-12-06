@extends('layouts.app')

@section('title')
    <h1>Edit User</h1>
@endsection

@section('content')

    {!! BootForm::open(['model'=>$user,'update'=>'users.update']) !!}
    {!! BootForm::text('name','Name') !!}
    {!! BootForm::email('email','Email Address') !!}
    {!! BootForm::select('role','Role',\App\User::getRoles(),array_search($user->role,\App\User::getRoles())) !!}
    {!! BootForm::password('password','Password',['placeholder'=>'Leave blank to keep un-changed']) !!}
    <div class="form-group">
        {!! BootForm::submit('Submit',['class'=>'btn btn-primary col-md-2 col-sm-2','name'=>'submit']) !!}
        {!! BootForm::submit('Cancel',['class'=>'btn btn-danger col-md-2 col-sm-2','name'=>'submit']) !!}
    </div>
    {!! BootForm::close() !!}
@endsection

@section('postJquery')
    @parent
    //<script> //This is here for IDE syntax highlighting
            if(!Modernizr.input.placeholder){
                $("input").each(function(){
                    if($(this).val()=="" &amp;&amp; $(this).attr("placeholder")!=""){
                        $(this).val($(this).attr("placeholder"));
                        $(this).focus(function(){
                            if($(this).val()==$(this).attr("placeholder")) $(this).val("");
                        });
                        $(this).blur(function(){
                            if($(this).val()=="") $(this).val($(this).attr("placeholder"));
                        });
                    }
                });
        }
@endsection