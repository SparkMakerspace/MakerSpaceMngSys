@extends('scaffold-interface.layouts.app')

@php($url = config('richfilemanager.url'))

@section('content')

{!! Form::open() !!}
    {!! Form::groups() !!}
{!! Form::imageselector('image[0]') !!}
{!! Form::imageselector('image[1]') !!}
{!! Form::imageselector('image[2]') !!}
{!! Form::close() !!}

@endsection