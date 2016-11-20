@extends('layouts.app')

@section('content')
    <!-- Outer Container -->
    <div class="container col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2">
        <!-- This is the title and new button area -->
        <div class="row">

            <div class="col-md-6 col-sm-6 col-xs-6 row">
                    @yield('title')
            </div>
            <div class="col-md-6 col-sm-6 col-xs-6 navButton pull-right">
                @yield('topButton')
            </div>

        </div>
        @yield('mainContent')

        @yield('footer')
    </div>

@endsection