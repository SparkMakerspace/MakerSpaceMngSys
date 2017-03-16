@extends('scaffold-interface.layouts.app')
@section('title',"3d Print queue - View 3d Mod - ".$auto3dprintqueue->Name)
@section('content')

    <div>
    <div style="border:none;float:left">
        <form method = 'get' action = '{!!url("auto3dprintqueue")!!}'>
            <button class = 'btn btn-primary'>auto3dprintqueue Index</button>
        </form>
        <section class="content">
            <h1>
                {!!$auto3dprintqueue->Name!!}
            </h1>
            <br>

            <img src="../../../../auto3dprintqueue/{{$auto3dprintqueue->id}}/thumb.png" width="20%" height="20%" style="border:none;float:left"></img>
            <br>
            <table class = 'table table-bordered'>
                <thead>
                <th>Key</th>
                <th>Value</th>
                </thead>
                <tbody>

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
                        <b><i>material : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->auto3dprintmaterial->material!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>name : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->name!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>username : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->username!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>phone : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->user->phone!!}</td>
                </tr>


                </tbody>
            </table>
        </section>
    </div>

    <iframe src="../../../../auto3dprintqueue/{{$auto3dprintqueue->id}}/viewer" width="50%" height="500" style="border:none;float:right"></iframe>


</div>

@endsection