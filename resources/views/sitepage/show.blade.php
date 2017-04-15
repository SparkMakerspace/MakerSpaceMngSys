@extends('scaffold-interface.layouts.app')
@section('title',$sitepage->PageTitle)
@section('head')
    




@endsection



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