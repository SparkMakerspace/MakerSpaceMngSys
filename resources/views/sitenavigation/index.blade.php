@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Sitenavigation Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("sitenavigation")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New sitenavigation</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>LinkText</th>
            <th>LinkImage</th>
            <th>LinkLoginReqd</th>
            <th>LinkURL</th>
            <th>LinkDescription</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($sitenavigations as $sitenavigation) 
            <tr>
                <td>{!!$sitenavigation->LinkText!!}</td>
                <td>{!!$sitenavigation->LinkImage!!}</td>
                <td>{!!$sitenavigation->LinkLoginReqd!!}</td>
                <td>{!!$sitenavigation->LinkURL!!}</td>
                <td>{!!$sitenavigation->LinkDescription!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/sitenavigation/{!!$sitenavigation->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/sitenavigation/{!!$sitenavigation->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/sitenavigation/{!!$sitenavigation->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $sitenavigations->render() !!}

</section>
@endsection