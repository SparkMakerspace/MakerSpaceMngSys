@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show calendar
    </h1>
    <br>
    <form method = 'get' action = '{!!url("calendar")!!}'>
        <button class = 'btn btn-primary'>calendar Index</button>
    </form>
    <br>
    {!! $calendar->calendar() !!}
    {!! $calendar->script() !!}
</section>
@endsection