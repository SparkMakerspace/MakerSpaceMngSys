<table class="table table-responsive" id="users-table">
    <thead>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
        <th colspan="5" class="text-center">Address</th>
        <th>Contact Pref</th>
        <th>KeyCard</th>
        <th>Role</th>
        <th>Active</th>
        @can('create',App\Models\User::class)
        <th colspan="3">Action</th>
        @endcan
    </thead>
    <tbody>
    @foreach($users as $user)
        <tr>
            <td>{!! $user->name !!}</td>
            <td>{!! $user->username !!}</td>
            <td>{!! $user->email !!}</td>
            <td>{!! $user->phone !!}</td>
            <td>{!! $user->streetAddress !!}</td>
            <td>{!! $user->streetAddress2 !!}</td>
            <td>{!! $user->cityAddress !!}</td>
            <td>{!! $user->stateAddress !!}</td>
            <td>{!! $user->zipAddress !!}</td>
            <td>{!! $user->contactPref !!}</td>
            <td>{!! $user->keyCard !!}</td>
            <td>{!! $user->role !!}</td>
            <td>{!! $user->active !!}</td>
            @can('create',App\Models\User::class)
            <td>
                {!! Form::open(['route' => ['users.destroy', $user->id], 'method' => 'delete']) !!}
                <div class='btn-group'>
                    <a href="{!! route('users.show', [$user->id]) !!}" class='btn btn-default btn-xs'><i class="glyphicon glyphicon-eye-open"></i></a>
                    <a href="{!! route('users.edit', [$user->id]) !!}" class='btn btn-default btn-xs'><i class="glyphicon glyphicon-edit"></i></a>
                    {!! Form::button('<i class="glyphicon glyphicon-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                </div>
                {!! Form::close() !!}
            </td>
            @endcan
        </tr>
    @endforeach
    </tbody>
</table>