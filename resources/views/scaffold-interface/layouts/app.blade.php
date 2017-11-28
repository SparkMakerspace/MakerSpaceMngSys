<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>@yield('title')</title>

    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.min.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.5/css/AdminLTE.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.5/css/skins/skin-blue.min.css">
    <link rel="stylesheet" href="{{url('css/fullcalendar.css')}}">
    @stack('head')
</head>
<body class="hold-transition skin-blue">
<script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
<script src="{{url('/js/moment.js')}}"></script>
<script src="{{url('/js/fullcalendar.js')}}"></script>
<script src="{{url('/js/app.js')}}"></script>
<div class="wrapper">
    <header class="main-header">
        <!-- Logo -->
        <a href="{{url('')}}" class="logo">
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b>Spark</b></span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b>Spark Makerspace</b></span>
        </a>
        <!-- Header Navbar: style can be found in header.less -->
        <nav class="navbar navbar-static-top">
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <div class="nav navbar-brand">@yield('title')</div>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">
                    <!-- Notification Navbar List-->
                    <li class="dropdown notifications-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-bell-o"></i>
                            <span class="label notification-label">new</span>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header">Your notifications</li>
                            <li>
                                <!-- inner menu: contains the actual data -->
                                <ul class="menu notification-menu">
                                </ul>
                            </li>
                            <li class="footer"><a href="#">View all</a></li>
                        </ul>
                    </li>
                    @hasanyrole(['superadmin','admin'])
                    <li class="">
                        <button class="nav navbar-brand btn-link" data-toggle="control-sidebar"><i class="fa fa-cog"></i></button>
                    </li>
                    @endhasanyrole
                    <!-- END notification navbar list-->
                    @if(Auth::user())
                        <li class="dropdown user user-menu">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                                {{--<img src="{{url(Auth::user()->image->path)}}" class="user-image" alt="User Image">--}}
                                <span class="hidden-xs">{{Auth::user()->name}}</span>
                            </a>
                            <ul class="dropdown-menu">
                                <!-- User image -->

                                <li class="user-header">
                                    <div class="btn btn-default btn-flat">
                                    <A href="{{Auth::user()->UserUrl()}}"  >
                                        {{--<img src="{{url(Auth::user()->image->path)}}" class="img-circle" alt="User Image">--}}
                                        <p>
                                            {{Auth::user()->name}}
                                        </p>
                                    </A>
                                    </div>
                                </li>

                                <!-- Menu Footer-->
                                <li class="user-footer">
                                    <div class="pull-right">
                                        <a href="{{url('logout')}}" class="btn btn-default btn-flat"
                                           onclick="event.preventDefault();
											document.getElementById('logout-form').submit();">Sign out</a>
                                        <form id="logout-form" action="{{ url('/logout') }}" method="POST" style="display: none;">
                                            {{ csrf_field() }}
                                        </form>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    @else
                        <li class="">
                            <a href="{{url('/login')}}">Login</a>
                        </li>
                        <li class="">
                            <a href="{{url('/register')}}">Join!</a>
                        </li>
                    @endif
                </ul>
            </div>
        </nav>
    </header>
    <aside class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
        <!-- sidebar menu: : style can be found in sidebar.less -->
            <ul class="sidebar-menu">
                {{--<li class="header">MAIN NAVIGATION</li>--}}
                @include('partials.leftSidebar')
                @yield('leftSidebar')
                @yield('someSideBarJunk')

            </ul>
        </section>
        <!-- /.sidebar -->
    </aside>
    <div class="content-wrapper">
        @yield('content')
    </div>
    <!-- The Right Sidebar -->
    <aside class="control-sidebar control-sidebar-dark">
        @yield('adminBar')
    </aside>
    <!-- The sidebar's background -->
    <!-- This div must placed right after the sidebar for it to work-->
    <div class="control-sidebar-bg"></div>
</div>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
    <div class = 'AjaxisModal'>
    </div>
</div>
<!-- Compiled and minified JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

<script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.5/js/demo.js"></script>
<script> var baseURL = "{{ URL::to('/') }}"</script>
<script src = "{{URL::asset('js/AjaxisBootstrap.js') }}"></script>
<script src = "{{URL::asset('js/scaffold-interface-js/customA.js') }}"></script>
<script src="https://js.pusher.com/3.2/pusher.min.js"></script>

<script>
    // pusher log to console.
    Pusher.logToConsole = true;
    // here is pusher client side code.
    var pusher = new Pusher("{{env("PUSHER_KEY")}}", {
        encrypted: true
    });
    var channel = pusher.subscribe('test-channel');
    channel.bind('test-event', function(data) {
        // display message coming from server on dashboard Notification Navbar List.
        $('.notification-label').addClass('label-warning');
        $('.notification-menu').append(
            '<li>\
                        <a href="#">\
                                    <i class="fa fa-users text-aqua"></i> '+data.message+'\
						</a>\
			</li>'
        );
    });
</script>
<script>
    $(document).ready(function(){
        @stack('jquery.ready')
    });
</script>
@stack('script')
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.8/jquery.mask.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/admin-lte/2.3.5/js/app.min.js"></script>
</body>
</html>
