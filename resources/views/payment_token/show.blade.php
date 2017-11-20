@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show payment_token
    </h1>
    <br>
    <a href='{!!url("payment_token")!!}' class = 'btn btn-primary'><i class="fa fa-home"></i>Payment_token Index</a>
    <br>
    <table class = 'table table-bordered'>
        <thead>
            <th>Key</th>
            <th>Value</th>
        </thead>
        <tbody>
            <tr>
                <td> <b>token</b> </td>
                <td>{!!$payment_token->token!!}</td>
            </tr>
            <tr>
                <td> <b>selected</b> </td>
                <td>{!!$payment_token->selected!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection