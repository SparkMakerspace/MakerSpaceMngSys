@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Sitenavigation Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("Sitenavigation")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New Sitenavigation</button>
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
        @foreach(\App\Sitenavigation::all() as $Sitenavigation)
            <tr>
                <td>
                    <a href="../../../../../../../{!!$Sitenavigation->LinkURL!!}" title="{!!$Sitenavigation->LinkDescription!!}">
                        @if ($Sitenavigation->LinkImage != "" )
                            <img src="{!!$Sitenavigation->LinkImage!!}"  height="42" width="42">
                        @else
                            <img src="../../../Images/noImage.svg"  height="42" width="42">
                        @endif
                        {!!$Sitenavigation->LinkText!!}
                    </a>
                </td>
                <td>{!!$Sitenavigation->LinkImage!!}</td>
                <td>{!!$Sitenavigation->LinkLoginReqd!!}</td>
                <td>{!!$Sitenavigation->LinkURL!!}</td>
                <td>{!!$Sitenavigation->LinkDescription!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/Sitenavigation/{!!$Sitenavigation->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/Sitenavigation/{!!$Sitenavigation->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/Sitenavigation/{!!$Sitenavigation->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>


</section>
@endsection