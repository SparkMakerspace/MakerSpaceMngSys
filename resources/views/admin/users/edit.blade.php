@extends('layouts.generalpage')

@section('title')
    <h1>Edit User</h1>
@endsection

@section('mainContent')
<form class="form" action="/admin/users/{{$user->id}}" method="post">
    <input type="hidden" name="_method" value="put">
    {{csrf_field()}}

    <div class="form-group-sm">
        <input class="form-control form" id="name" name="name" type="text" value="{{$user->name}}">
    </div>
    <div class="form-group-sm">
        <input class="form-control" id="email" name="email" type="email" value="{{$user->email}}">
    </div>
    <div class="form-group-sm">
        <select class="form-control" id="role" name="role">
            <option value="0">
                user
            </option>
            <option value="1" @if($user->role == "admin")selected="selected"@endif>
                admin
            </option>
        </select>
    </div>
    <div class="btn-group">
        <input class="btn-link" type="submit" name="Save" value="Save" id="submit">
        <input class="btn-link" type="submit" name="Cancel" value="Cancel" id="Cancel">
    </div>
</form>
@endsection