<!-- Navbar -->
<ul class="w3-navbar w3-large w3-card-8 w3-theme-dark w3-left-align">
    <li class="w3-hide-medium w3-hide-large w3-black w3-opennav w3-right">
        <a href="javascript:void(0);" onclick="myFunction('smallNav')">&#9776;</a>
    </li>
    <li><a href="{{URL::route('welcome')}}">Spark Makerspace</a></li>
    <li class="w3-hide-small w3-dropdown-hover">
        <a onclick="myFunction('groups')" href="{{route('groups.index')}}">
            Workspaces {!!FA::icon('group')!!}
        </a>
        <div id="groups" class="w3-dropdown-content">
            @foreach(\App\Group::getGroups() as $group)
                <a href="/groups/{{$group->id}}">{{$group->name}}</a>
            @endforeach
        </div>
    </li>
    <li class="w3-hide-small"><a href="{{route('posts.index')}}">Posts</a></li>
    @if(!Auth::guest())
        @if(Auth::user()->hasRole('admin'))
            <li class="w3-hide-small"><a href="{{route('admin')}}">Admin</a></li>
        @endif
        <li class="w3-hide-small w3-dropdown-hover w3-right">
            <a onclick="myFunction('loggedIn')" href="javascript:void(0)">
                {{Auth::user()->name}} {!! FA::icon('cog')->spin() !!}
            </a>
            <div id="loggedIn" class="w3-dropdown-content">
                <a href="{{route('dashboard')}}">Dashboard</a>
                <form id="myform" method="post" action="{{route('logout')}}">
                    {{csrf_field()}}
                    <a onclick="document.getElementById('myform').submit();" href="javascript:void(0)">Logout</a>
                </form>
            </div>
        </li>
    @else
        <li class="w3-hide-small w3-right"><a href="{{route('login')}}">Login</a></li>
        <li class="w3-hide-small w3-right"><a href="{{route('register')}}">Register</a></li>
    @endif
</ul>

{{-- MOBILE SECTION --}}
<div id="smallNav" class="w3-hide w3-hide-large w3-hide-medium">
    <ul class="w3-navbar w3-left-align w3-large w3-black">
        <li class="w3-dropdown-click">
            <a onclick="myFunction('groups2')" href="javascript:void(0)">
                Workspaces {!! FA::icon('group') !!}
            </a>
            <div id="groups2" class="w3-dropdown-content">
                @foreach(\App\Group::getGroups() as $group)
                    <a href="/groups/{{$group->id}}">{{$group->name}}</a>
                @endforeach
            </div>
        </li>
        <li><a href="{{route('posts.index')}}">Posts</a></li>
        {{-- If you're logged in, show this menu--}}
        @if(!Auth::guest())
            @if(Auth::user()->hasRole('admin'))
                <li><a href="{{route('admin')}}">Admin</a></li>
            @endif
            <li class="w3-dropdown-click w3-right">
                <a onclick="myFunction('loggedIn2')" href="javascript:void(0)">
                    {{Auth::user()->name}} {!! FA::icon('cog')->spin() !!}
                </a>
                <div id="loggedIn2" class="w3-dropdown-content">
                    <a href="{{route('dashboard')}}">Dashboard</a>
                    <form id="myform" method="post" action="{{route('logout')}}">
                        {{csrf_field()}}
                        <a onclick="document.getElementById('myform').submit();">Logout</a>
                    </form>
                </div>
            </li>
        {{-- If you're not logged in, offer regestration or login --}}
        @else
            <li><a href="{{route('login')}}">Login</a></li>
            <li><a href="{{route('register')}}">Register</a></li>
        @endif
    </ul>
</div>

<script>
    function myFunction($id) {
        var x = document.getElementById($id);
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    }
</script>