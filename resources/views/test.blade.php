@extends('scaffold-interface.layouts.app')

@php($url = config('richfilemanager.url'))

@section('content')

{!! Form::open() !!}
    {!! Form::groups() !!}
{!! Form::close() !!}


<ul class="timeline">

    <!-- timeline time label -->
    <li class="time-label">
        <span class="bg-red">
            10 Feb. 2014 922 pm
        </span>
    </li>
    <!-- /.timeline-label -->

    <!-- timeline item -->
    <li>
        <!-- timeline icon -->
        <i class="fa fa-envelope bg-blue"></i>
        <div class="timeline-item">
            <span class="time"><i class="fa fa-clock-o"></i> 12:05</span>

            <h3 class="timeline-header"><a href="#">Support Team</a> ...</h3>

            <div class="timeline-body">
                ...
                Content goes here
            </div>

            <div class="timeline-footer">
                <a class="btn btn-primary btn-xs">...</a>
            </div>
        </div>
    </li>
    <!-- END timeline item -->

    ...

</ul>



<form action="/charge" method="POST">
    <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
    <script
            src="https://checkout.stripe.com/checkout.js"
            class="stripe-button"
            data-key="{{env('STRIPE_KEY_PUBLIC')}}"
            data-image="/square-image.png"
            data-name="Demo Site"
            data-description="2 widgets ($20.00)"
            data-amount="2000">
    </script>
</form>
@endsection