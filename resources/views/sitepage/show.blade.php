@extends('scaffold-interface.layouts.app')
@section('title',$sitepage->PageTitle)
@section('content')
    Published on {!!$sitepage->PagePublishDate!!}
<div>
    {!!$sitepage->PageContent!!}
</div>
<section class="content">
    <h1>
        Show sitepage
    </h1>
    <br>
    <form method = 'get' action = '{!!url("sitepage")!!}'>
        <button class = 'btn btn-primary'>sitepage Index</button>
    </form>
    <br>
    <table class = 'table table-bordered'>
        <thead>
            <th>Key</th>
            <th>Value</th>
        </thead>
        <tbody>
            <tr>
                <td>
                    <b><i>PageTitle : </i></b>
                </td>
                <td>{!!$sitepage->PageTitle!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>PageContent : </i></b>
                </td>
                <td>{!!$sitepage->PageContent!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>PagePublishDate : </i></b>
                </td>
                <td>{!!$sitepage->PagePublishDate!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>PageStub : </i></b>
                </td>
                <td>{!!$sitepage->PageStub!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>PageCSS : </i></b>
                </td>
                <td>{!!$sitepage->PageCSS!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>PageJavaScript : </i></b>
                </td>
                <td>{!!$sitepage->PageJavaScript!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>PageKeywords : </i></b>
                </td>
                <td>{!!$sitepage->PageKeywords!!}</td>
            </tr>
        </tbody>
    </table>
</section>
    <style>
        {!!$sitepage->PageCSS!!}
    </style>

    <script>
        {!!$sitepage->PageJavaScript!!}
    </script>


@endsection