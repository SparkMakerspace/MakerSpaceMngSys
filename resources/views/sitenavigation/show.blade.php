@extends('scaffold-interface.layouts.app')
@section('title',$sitenavigation->PageTitle)
@section('head')

    <script>
        {!!$sitenavigation->PageJavaScript!!}
    </script>


    <style>
        {!!$sitenavigation->PageCSS!!}
    </style>
    <meta name="keywords" content="{!!$sitenavigation->PageKeywords!!}">
@endsection



@section('content')

    Published on {!!$sitenavigation->PagePublishDate!!}
    <div>
        {!!$sitenavigation->PageContent!!}
    </div>


@endsection