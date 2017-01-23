@extends('scaffold-interface.layouts.app')
@section('content')
    <section class="content">
        <div class="box box-primary">
            <div class="box-header">
                <h3>Edit Role</h3>
            </div>
            <div class="box-body">
                <form action="{{url('roles/update')}}" method = "post">
                    {!! csrf_field() !!}
                    <input type="hidden" name = "role_id" value = "{{$role->id}}">
                    <div class="form-group">
                        <label for="">Role</label>
                        <input type="text" name = "name" class = "form-control" placeholder = "Name" value = "{{$role->name}}">
                    </div>
                    <div class="row">
                    @foreach(\Spatie\Permission\Models\Permission::all() as $permission)
                        <div class="col-md-3 col-sm-6"> <label class="checkbox-inline">
                            <input type="checkbox" name="permission[{{$permission->name}}]" class="checkbox" @if($role->hasPermissionTo($permission->name))checked @endif>{{$permission->name}}
                        </label></div>
                    @endforeach
                    </div>
                    <div class="box-footer">
                        <button class = 'btn btn-primary' type = "submit">Update</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
@endsection

