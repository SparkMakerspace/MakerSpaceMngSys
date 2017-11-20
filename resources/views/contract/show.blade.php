@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show contract
    </h1>
    <br>
    <a href='{!!url("contract")!!}' class = 'btn btn-primary'><i class="fa fa-home"></i>Contract Index</a>
    <br>
    <table class = 'table table-bordered'>
        <thead>
            <th>Key</th>
            <th>Value</th>
        </thead>
        <tbody>
            <tr>
                <td> <b>text</b> </td>
                <td>{!!$contract->text!!}</td>
            </tr>
            <tr>
                <td> <b>revision</b> </td>
                <td>{!!$contract->revision!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection