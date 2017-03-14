@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show auto3dprintcue
    </h1>
    <br>
    <form method = 'get' action = '{!!url("auto3dprintcue")!!}'>
        <button class = 'btn btn-primary'>auto3dprintcue Index</button>
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
                <td>{!!$auto3dprintcue->Name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>Infill : </i></b>
                </td>
                <td>{!!$auto3dprintcue->Infill!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>Status : </i></b>
                </td>
                <td>{!!$auto3dprintcue->Status!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>Notified : </i></b>
                </td>
                <td>{!!$auto3dprintcue->Notified!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>color : </i></b>
                </td>
                <td>{!!$auto3dprintcue->auto3dprintercolor->color!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>created_at : </i></b>
                </td>
                <td>{!!$auto3dprintcue->auto3dprintercolor->created_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>updated_at : </i></b>
                </td>
                <td>{!!$auto3dprintcue->auto3dprintercolor->updated_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>deleted_at : </i></b>
                </td>
                <td>{!!$auto3dprintcue->auto3dprintercolor->deleted_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>material : </i></b>
                </td>
                <td>{!!$auto3dprintcue->auto3dprintmaterial->material!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>created_at : </i></b>
                </td>
                <td>{!!$auto3dprintcue->auto3dprintmaterial->created_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>updated_at : </i></b>
                </td>
                <td>{!!$auto3dprintcue->auto3dprintmaterial->updated_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>deleted_at : </i></b>
                </td>
                <td>{!!$auto3dprintcue->auto3dprintmaterial->deleted_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>name : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->name!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>email : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->email!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>password : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->password!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>remember_token : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->remember_token!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>created_at : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->created_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>updated_at : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->updated_at!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>username : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->username!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>address1 : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->address1!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>address2 : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->address2!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>city : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->city!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>state : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->state!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>zipcode : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->zipcode!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>phone : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->phone!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>active : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->active!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>accountType : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->accountType!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>bio : </i></b>
                </td>
                <td>{!!$auto3dprintcue->user->bio!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection