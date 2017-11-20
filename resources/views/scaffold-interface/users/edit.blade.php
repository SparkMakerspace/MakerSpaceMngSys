@extends('scaffold-interface.layouts.app')
@section('content')
	<section class="content">
		<div class="box box-primary">
			<div class="box-header">
				<h3>Edit User ({{$user->name}})</h3>
			</div>
			<div class="box-body">
				<form action="{{url('/scaffold-users/update')}}" method = "post">
					{!! csrf_field() !!}
					<input type="hidden" name = "user_id" value = "{{$user->id}}">
					<div class="form-group">
						<label for="">Email</label>
						<input type="email" name = "email" value = "{{$user->email}}" class = "form-control" required>
					</div>
					<div class="form-group">
						<label for="">Name</label>
						<input type="text" name = "name" value = "{{$user->name}}" class = "form-control" required>
					</div>
					<div class="form-group">
						<label for="">User Name</label>
						<input type="text" name = "username" value = "{{$user->username}}" class = "form-control" required>
					</div>
					<div class="form-group">
						<label for="">Password</label>
						<input type="password" name = "password" class = "form-control" placeholder = "password">
					</div>
					<div class="form-group{{ $errors->has('address1') ? ' has-error' : '' }}">
						<label for="address1">Address Line 1</label>
						<input id="address1" name="address1" type="text" placeholder="address line 1"
							   class="form-control" value = "{{$user->address1}}">
						@if ($errors->has('address1'))
							<span class="help-block">
                                            <strong>{{ $errors->first('address1') }}</strong>
                                        </span>
						@endif
					</div>
					<div class="form-group{{ $errors->has('address2') ? ' has-error' : '' }}">
						<label for="address2">Address Line 2</label>
						<input id="address2" name="address2" type="text"
							   class="form-control" value = "{{$user->address2}}">
						@if ($errors->has('address2'))
							<span class="help-block">
                                            <strong>{{ $errors->first('address2') }}</strong>
                                        </span>
						@endif
					</div>
					<div class="form-group{{ $errors->has('city') ? ' has-error' : '' }}">
						<label for="city">City / Town</label>
						<input id="city" name="city" type="text" placeholder="city"
							   class="form-control" value="{{$user->city}}">
						@if ($errors->has('city'))
							<span class="help-block">
                                            <strong>{{ $errors->first('city') }}</strong>
                                        </span>
						@endif
					</div>
					<div class="form-group{{ $errors->has('state') ? ' has-error' : '' }}">
						<label for="state">State</label>
						<input id="state" name="state" type="text" placeholder="state"
							   class="form-control" value="{{$user->state}}">
						@if ($errors->has('state'))
							<span class="help-block">
                                            <strong>{{ $errors->first('state') }}</strong>
                                        </span>
						@endif
					</div>
					<div class="form-group{{ $errors->has('zipcode') ? ' has-error' : '' }}">
						<label for="zipcode">Zip / Postal Code</label>
						<input id="zipcode" name="zipcode" type="text" placeholder="zip or postal code"
							   class="form-control" value="{{$user->zipcode}}">
						@if ($errors->has('zipcode'))
							<span class="help-block">
                                            <strong>{{ $errors->first('zipcode') }}</strong>
                                        </span>
						@endif
					</div>
					<div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
						<label for="phone">Phone Number</label>
						<input id="phone" type="text" class="phone form-control" name="phone"
							   placeholder="(xxx) xxx-xxxx" value="{{ $user->phone }}" required>
						@if ($errors->has('phone'))
							<span class="help-block">
                                        <strong>{{ $errors->first('phone') }}</strong>
                                    </span>
						@endif
					</div>
					<div class="form-group{{ $errors->has('role') ? ' has-error' : '' }}">
						<label for="role">User Role</label>
						<select id="role" class="role form-control" name="role">
							@foreach(\Spatie\Permission\Models\Role::all() as $role)
								<option @if($user->hasRole($role)) selected @endif >{{$role->name}}</option>
							@endforeach
						</select>
						@if ($errors->has('role'))
							<span class="help-block">
                                        <strong>{{ $errors->first('role') }}</strong>
                                    </span>
						@endif
					</div>
					<button class = "btn btn-primary" type="submit">Update</button>
				</form>
			</div>
			<div>
				<div class="box box-primary">
					<div class="box-header">
						<h3>{{$user->name}} Groups</h3>
					</div>
					<div class="box-body">
						<form action="{{url('/scaffold-users/selectGroups')}}" method="post">

						</form>
					</div>
				</div>
			</div>
			<div>
				<div class="box box-primary">
					<div class="box-header">
						<h3>{{$user->name}} Permissions</h3>
					</div>
					<div class="box-body">
						<form action="{{url('/scaffold-users/addPermission')}}" method = "post">
							{!! csrf_field() !!}
							<input type="hidden" name = "user_id" value = "{{$user->id}}">
							<div class="form-group">
								<select name="permission_name" id="" class = "form-control">
									@foreach($permissions as $permission)
										<option value="{{$permission}}">{{$permission}}</option>
									@endforeach
								</select>
							</div>
							<div class="form-group">
								<button class = 'btn btn-primary'>Add permission</button>
							</div>
						</form>
						<table class = 'table'>
							<thead>
							<th>Permission</th>
							<th>Action</th>
							</thead>
							<tbody>
							@foreach($userPermissions as $permission)
								<tr>
									<td>{{$permission->name}}</td>
									<td><a href="{{url('/scaffold-users/removePermission')}}/{{str_slug($permission->name,'-')}}/{{$user->id}}" class = "btn btn-danger btn-sm"><i class="fa fa-trash-o" aria-hidden="true"></i></a></td>
								</tr>
							@endforeach
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</section>
@endsection
@section('script')
	<script>
        $(document).ready(function($) {
            $('#state').mask('AA');
            $('#phone').mask('(999) 999-9999');
            $('#fax').mask('(999) 999-9999');
            $('#zipcode').mask('99999');
        });
	</script>
@endsection
