@extends('scaffold-interface.layouts.app')
@section('title','Index')
@section('content')

<section class="content">
    <h1>
        Payment_token Index
    </h1>
    <a href='{!!url("payment_token")!!}/create' class = 'btn btn-success'><i class="fa fa-plus"></i> New</a>
    <br>
    <br>
    <table class = "table table-striped table-bordered table-hover" style = 'background:#fff'>
        <thead>
            <th>token</th>
            <th>selected</th>
            <th>actions</th>
        </thead>
        <tbody>
            @foreach($payment_tokens as $payment_token) 
            <tr>
                <td>{!!$payment_token->token!!}</td>
                <td>{!!$payment_token->selected!!}</td>
                <td>
                    <a data-toggle="modal" data-target="#myModal" class = 'delete btn btn-danger btn-xs' data-link = "/payment_token/{!!$payment_token->id!!}/deleteMsg" ><i class = 'fa fa-trash'> delete</i></a>
                    <a href = '#' class = 'viewEdit btn btn-primary btn-xs' data-link = '/payment_token/{!!$payment_token->id!!}/edit'><i class = 'fa fa-edit'> edit</i></a>
                    <a href = '#' class = 'viewShow btn btn-warning btn-xs' data-link = '/payment_token/{!!$payment_token->id!!}'><i class = 'fa fa-eye'> info</i></a>
                </td>
            </tr>
            @endforeach 
        </tbody>
    </table>
    {!! $payment_tokens->render() !!}

</section>
@endsection