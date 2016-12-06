<!-- Navbar -->
<div class="w3-top">
    <ul class="w3-navbar w3-gray w3-left-align">
        <li class="w3-hide-medium w3-hide-large w3-opennav w3-right">
            <a class=" w3-hover-white w3-theme-d2" href="javascript:void(0);" onclick="openNav()"><i class="fa fa-bars"></i></a>
        </li>
        <li><a href="{{URL::route('welcome')}}" class=" w3-theme-d4"><i class="fa fa-home w3-margin-right"></i>Logo</a></li>
        <li><a href="{{URL::route('posts.index')}}"><i class="fa fa-pencil-square" title="Posts"></i></a></li>
        <li class="w3-hover-white w3-hide-small w3-dropdown-click">
            <a onclick="expand('groups')" class="w3-hover-white"><i class="fa fa-users"></i></a>
            <div id="groups" class="w3-dropdown-content w3-hover-white">
                @foreach(\App\Group::getGroups() as $group)
                    <a class="w3-hover-white w3-border w3-border-dark-gray w3-hover-light-gray">{{$group->name}}</a>
                @endforeach
            </div>
        </li>
        @if(Auth::guest())
            <li class="w3-right w3-hide-small">
                <a href="{{URL::route('login')}}" class="w3-hover-white " title="Login">Login</a>
        @else
            <li class="w3-right w3-hide-small w3-dropdown-click">
                <a onclick="expand('loggedIn')" class=" w3-light-gray w3-hover-white w3-border w3-hover-border-black">{{Auth::user()->name}}</a>
                <div id="loggedIn" class="w3-hover-white w3-dropdown-content w3-right-align" style="right: 0">
                    <a href="{{URL::route('dashboard')}}" class="w3-hover-white w3-border w3-border-dark-gray w3-hover-light-gray">Dashboard</a>
                    <a href="{{URL::route('logout')}}" class="w3-hover-white w3-border w3-border-dark-gray w3-hover-light-gray">Logout</a>
                </div>
                <script>
                    function expand(menu) {
                        var x = document.getElementById(menu);
                        if (x.className.indexOf("w3-show") == -1)
                            x.className += " w3-show";
                        else
                            x.className = x.className.replace(" w3-show", "");
                    }
                </script>
        @endif
        </li>
    </ul>
</div>

<!-- Navbar on small screens -->
<div id="navDemo" class="w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:51px">
    <ul class="w3-navbar w3-left-align w3-large w3-theme">
        <li><a class="w3-padding-large" href="#">Link 1</a></li>
        <li><a class="w3-padding-large" href="#">Link 2</a></li>
        <li><a class="w3-padding-large" href="#">Link 3</a></li>
        <li><a class="w3-padding-large" href="#">My Profile</a></li>
    </ul>
</div>