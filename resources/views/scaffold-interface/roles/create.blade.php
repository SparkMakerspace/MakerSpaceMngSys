@extends('scaffold-interface.layouts.app')
@section('content')
<section class="content">
	<div class="box box-primary">
		<div class="box-header">
			<h3>Create new Role</h3>
		</div>
		<div class="box-body">
			<form action="{{url('/scaffold-roles/store')}}" method = "post">
				{!! csrf_field() !!}
				<div class="form-group">
				<label for="">Role</label>
					<input type="text" name = "name" class = "form-control" placeholder = "Name">
				</div>
				<div class="row">
				@foreach(\Spatie\Permission\Models\Permission::all() as $permission)
					<div class="col-md-2 col-sm-6">
					<label class="checkbox-inline">
						<input type="checkbox" name="permission[{{$permission->name}}]" class="checkbox">{{$permission->name}}
					</label></div>
				@endforeach
				</div>
				<div class="box-footer">
					<button class = 'btn btn-primary' type = "submit">Create</button>
				</div>
			</form>
		</div>
	</div>
</section>
@endsection
