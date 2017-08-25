@extends('scaffold-interface.layouts.app')
@section('title',$Sitenavigation->PageTitle)
@section('head')

    <script>
        {!!$Sitenavigation->PageJavaScript!!}
    </script>


    <style>
        {!!$Sitenavigation->PageCSS!!}
    </style>
    <meta name="keywords" content="{!!$Sitenavigation->PageKeywords!!}">
@endsection



@section('content')

    Published on {!!$Sitenavigation->PagePublishDate!!}
    <div>
        {!!$Sitenavigation->PageContent!!}
    </div>


@endsection