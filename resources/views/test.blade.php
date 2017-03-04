@extends('scaffold-interface.layouts.app')

@section('content')
    <img src="{{url(asset(\App\Image::first()->path))}}">
@endsection