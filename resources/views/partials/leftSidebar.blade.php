<li class="active treeview">
    <a href="{{url('dashboard')}}">
        <i class="fa fa-dashboard"></i> <span>Dashboard</span>
    </a>
</li>
<li class="treeview"><a href="{{url('./event')}}"></i> <span>Calendar</span></a></li>
<li class="treeview"><a href="{{url('./g/')}}"></i> <span>Groups</span></a></li>
<li class="treeview"><a href="{{url('./post/')}}"></i> <span>Posts</span></a></li>
<li class="treeview"><a href="{{url('./resource/')}}"></i> <span>Resources</span></a></li>


<li class="treeview"><a href="{{url('./comment/')}}"></i> <span>Comments</span></a></li>

<li class="treeview"><a href="{{url('./door/')}}"></i> <span>Doors</span></a></li>

<li class="treeview"><a href="{{url('./image/')}}"></i> <span>Images</span></a></li>

<li class="treeview"><a href="{{url('./test/')}}"></i> <span>TEST!!</span></a></li>

@hasanyrole(['superadmin','admin'])
<li class="header">ADMINISTRATOR</li>
<li class="treeview"><a href="{{url('/users')}}"><i class="fa fa-users"></i> <span>Users</span></a></li>
<li class="treeview"><a href="{{url('/roles')}}"><i class="fa fa-user-plus"></i> <span>Role</span></a></li>
<li class="treeview"><a href="{{url('/permissions')}}"><i class="fa fa-key"></i> <span>Permissions</span></a></li>
@endhasanyrole