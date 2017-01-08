<li class="{{ Request::is('posts*') ? 'active' : '' }}">
    <a href="{!! route('posts.index') !!}"><i class="fa fa-edit"></i><span>Posts</span></a>
</li>

@can('index',\App\Models\User::class)
<li class="{{ Request::is('users*') ? 'active' : '' }}">
    <a href="{!! route('users.index') !!}"><i class="fa fa-edit"></i><span>Users</span></a>
</li>
@endcan

<li class="{{ Request::is('groups*') ? 'active' : '' }}">
    <a href="{!! route('groups.index') !!}"><i class="fa fa-edit"></i><span>Groups</span></a>
</li>

