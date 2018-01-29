@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

<section class="content">
    <h1>
        Create payment_token
    </h1>
    <a href="{!!url('payment_token')!!}" class = 'btn btn-danger'><i class="fa fa-home"></i> Payment_token Index</a>
    <br>
    <form method = 'POST' action = '{!!url("payment_token")!!}'>
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <script
                src="https://checkout.stripe.com/checkout.js"
                class="stripe-button"
                data-key="{{env('STRIPE_KEY_PUBLIC')}}"

                data-name="Demo Site"

        </script>
</section>



<form action="/charge" method="POST">

</form>




@endsection