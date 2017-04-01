@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show chore_list
    </h1>
    <br>
    <form method = 'get' action = '{!!url("chore_list")!!}'>
        <button class = 'btn btn-primary'>chore_list Index</button>
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
                    <b><i>Name : </i></b>
                </td>
                <td>{!!$chore_list->Name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>Description : </i></b>
                </td>
                <td>{!!$chore_list->Description!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>CompletedByUser : </i></b>
                </td>
                <td>{!!$chore_list->CompletedByUser!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>TaskTimeReqd : </i></b>
                </td>
                <td>{!!$chore_list->TaskTimeReqd!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>image : </i></b>
                </td>
                <td>{!!$chore_list->image!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>NeedDate : </i></b>
                </td>
                <td>{!!$chore_list->NeedDate!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>name : </i></b>
                </td>
                <td>{!!$chore_list->resource->name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>location : </i></b>
                </td>
                <td>{!!$chore_list->resource->location!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>type : </i></b>
                </td>
                <td>{!!$chore_list->resource->type!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>description : </i></b>
                </td>
                <td>{!!$chore_list->resource->description!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>requiresAuth : </i></b>
                </td>
                <td>{!!$chore_list->resource->requiresAuth!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>created_at : </i></b>
                </td>
                <td>{!!$chore_list->resource->created_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>updated_at : </i></b>
                </td>
                <td>{!!$chore_list->resource->updated_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>deleted_at : </i></b>
                </td>
                <td>{!!$chore_list->resource->deleted_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>name : </i></b>
                </td>
                <td>{!!$chore_list->user->name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>email : </i></b>
                </td>
                <td>{!!$chore_list->user->email!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>password : </i></b>
                </td>
                <td>{!!$chore_list->user->password!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>remember_token : </i></b>
                </td>
                <td>{!!$chore_list->user->remember_token!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>created_at : </i></b>
                </td>
                <td>{!!$chore_list->user->created_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>updated_at : </i></b>
                </td>
                <td>{!!$chore_list->user->updated_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>username : </i></b>
                </td>
                <td>{!!$chore_list->user->username!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>address1 : </i></b>
                </td>
                <td>{!!$chore_list->user->address1!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>address2 : </i></b>
                </td>
                <td>{!!$chore_list->user->address2!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>city : </i></b>
                </td>
                <td>{!!$chore_list->user->city!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>state : </i></b>
                </td>
                <td>{!!$chore_list->user->state!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>zipcode : </i></b>
                </td>
                <td>{!!$chore_list->user->zipcode!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>phone : </i></b>
                </td>
                <td>{!!$chore_list->user->phone!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>active : </i></b>
                </td>
                <td>{!!$chore_list->user->active!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>accountType : </i></b>
                </td>
                <td>{!!$chore_list->user->accountType!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>bio : </i></b>
                </td>
                <td>{!!$chore_list->user->bio!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection