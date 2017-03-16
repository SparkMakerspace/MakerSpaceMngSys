@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show sitenavigation
    </h1>
    <br>
    <form method = 'get' action = '{!!url("sitenavigation")!!}'>
        <button class = 'btn btn-primary'>sitenavigation Index</button>
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
                    <b><i>LinkText : </i></b>
                </td>
                <td>{!!$sitenavigation->LinkText!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>LinkImage : </i></b>
                </td>
                <td>{!!$sitenavigation->LinkImage!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>LinkLoginReqd : </i></b>
                </td>
                <td>{!!$sitenavigation->LinkLoginReqd!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>LinkURL : </i></b>
                </td>
                <td>{!!$sitenavigation->LinkURL!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>LinkDescription : </i></b>
                </td>
                <td>{!!$sitenavigation->LinkDescription!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection