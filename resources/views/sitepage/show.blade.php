@extends('scaffold-interface.layouts.app')
@section('title',$sitepage->PageTitle)
@section('head')

    <script>
        {!!$sitepage->PageJavaScript!!}
    </script>


    <style>
        {!!$sitepage->PageCSS!!}
    </style>
    <meta name="keywords" content="{!!$sitepage->PageKeywords!!}">
@endsection



@section('content')
    Published on {!!$sitepage->PagePublishDate!!}
<div>
    {!!$sitepage->PageContent!!}
</div>


@endsection