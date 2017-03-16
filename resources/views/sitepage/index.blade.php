@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Sitepage Index
    </h1>
    <form class = 'col s3' method = 'get' action = '{!!url("sitepage")!!}/create'>
        <button class = 'btn btn-primary' type = 'submit'>Create New sitepage</button>
    </form>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>PageTitle</th>
            <th>PageContent</th>
            <th>PagePublishDate</th>
            <th>PageStub</th>
            <th>PageCSS</th>
            <th>PageJavaScript</th>
            <th>PageKeywords</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($sitepages as $sitepage) 
            <tr>
                <td>{!!$sitepage->PageTitle!!}</td>
                <td>{!!$sitepage->PageContent!!}</td>
                <td>{!!$sitepage->PagePublishDate!!}</td>
                <td>{!!$sitepage->PageStub!!}</td>
                <td>{!!$sitepage->PageCSS!!}</td>
                <td>{!!$sitepage->PageJavaScript!!}</td>
                <td>{!!$sitepage->PageKeywords!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/sitepage/{!!$sitepage->id!!}/deleteMsg" ><i class = 'material-icons'>delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/sitepage/{!!$sitepage->id!!}/edit'><i class = 'material-icons'>edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/sitepage/{!!$sitepage->id!!}'><i class = 'material-icons'>info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $sitepages->render() !!}

</section>
@endsection