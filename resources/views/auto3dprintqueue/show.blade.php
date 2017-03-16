@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')


    <div style="border:none;float:left">
        <section class="content">
            <h1>
                Show auto3dprintqueue
            </h1>
            <br>
            <form method = 'get' action = '{!!url("auto3dprintqueue")!!}'>
                <button class = 'btn btn-primary'>auto3dprintqueue Index</button>
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
                    <td>{!!$auto3dprintqueue->Name!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>Infill : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->Infill!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>Status : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->Status!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>Notified : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->Notified!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>color : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintercolor->color!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>created_at : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintercolor->created_at!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>updated_at : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintercolor->updated_at!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>deleted_at : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintercolor->deleted_at!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>material : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintmaterial->material!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>created_at : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintmaterial->created_at!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>updated_at : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintmaterial->updated_at!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>deleted_at : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintmaterial->deleted_at!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>name : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->name!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>email : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->email!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>password : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->password!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>remember_token : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->remember_token!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>created_at : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->created_at!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>updated_at : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->updated_at!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>username : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->username!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>address1 : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->address1!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>address2 : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->address2!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>city : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->city!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>state : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->state!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>zipcode : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->zipcode!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>phone : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->phone!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>active : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->active!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>accountType : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->accountType!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>bio : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->bio!!}</td>
                </tr>
                </tbody>
            </table>
        </section>
    </div>

        <iframe src="../../../../auto3dprintqueue/{{$auto3dprintqueue->id}}/viewer" width="50%" height="500" style="border:none;float:right"></iframe>




@endsection