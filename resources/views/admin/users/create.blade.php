@extends('layouts.generalpage')

@section('title')
    <h1>Create User</h1>
@endsection

@section('mainContent')
    {!! BootForm::open(['model'=>$user,'store'=>'users.store'])!!}
    {!! BootForm::text('name','User Name') !!}
    {!! BootForm::email('email','Email Address') !!}
    {!! BootForm::select('role','Role',\App\User::getRoles()) !!}
    {!! BootForm::password('password','Password') !!}
@endsection

@section('footer')
    <div class="form-group">
        {!! BootForm::submit('Submit',['class'=>'btn btn-primary col-md-2 col-sm-2','name'=>'submit']) !!}
        {!! BootForm::submit('Cancel',['class'=>'btn btn-danger col-md-2 col-sm-2','name'=>'submit']) !!}
    </div>
    {!! BootForm::close() !!}
@endsection