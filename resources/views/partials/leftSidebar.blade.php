<li class="active treeview">
    <a href="{{url('dashboard')}}">
        <i class="fa fa-dashboard"></i> <span>Dashboard</span>
    </a>
</li>

@foreach(\App\Sitenavigation::all() as $Sitenavigation)
    <li class="treeview">

            <a href="../../../../../../../{!!$Sitenavigation->LinkURL!!}" title="{!!$Sitenavigation->LinkDescription!!}">
                @if ($Sitenavigation->LinkImage != "" )
                    <img src="{!!url($Sitenavigation->LinkImage)!!}"  height="25" width="25">
                @else
                    <img src="{{url("Images/noImage.svg")}}"  height="25" width="25">
                @endif
                {!!$Sitenavigation->LinkText!!}
            </a>
        </td>
    </li>
@endforeach

@yield('sidebar.specific')

@hasanyrole(['superadmin','admin'])
<li class="header">ADMINISTRATOR</li>

<li class="treeview"><a href="{{url('/users')}}"><i class="fa fa-users"></i> <span>Users</span></a></li>

<li class="treeview"><a href="{{url('/roles')}}"><i class="fa fa-user-plus"></i> <span>Role</span></a></li>

<li class="treeview"><a href="{{url('/permissions')}}"><i class="fa fa-key"></i> <span>Permissions</span></a></li>

<li class="treeview"><a href="{{url('/Sitenavigation')}}"><i class="fa fa-key"></i> <span>Site Navigation & Pages</span></a></li>



@endhasanyrole