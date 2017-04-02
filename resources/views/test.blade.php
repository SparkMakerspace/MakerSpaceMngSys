@extends('scaffold-interface.layouts.app')

@php($url = config('richfilemanager.url'))

@section('content')

{!! Form::open() !!}
    {!! Form::groups() !!}
{!! Form::imageselector() !!}
{!! Form::close() !!}

@endsection