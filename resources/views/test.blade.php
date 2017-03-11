@extends('scaffold-interface.layouts.app')

@section('content')
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
    <script src="/vendor/jjfs85/laradrop/js/enyo.dropzone.js"></script>
    <script src="/vendor/jjfs85/laradrop/js/laradrop.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.min.js" ></script>
    {{--<link href="/vendor/jjfs85/laradrop/css/styles.css" rel="stylesheet" type="text/css">--}}
    <div class="laradrop" laradrop-csrf-token="{{ csrf_token() }}"> </div>
@endsection

@push('jquery.ready')
    jQuery('.laradrop').laradrop();
@endpush