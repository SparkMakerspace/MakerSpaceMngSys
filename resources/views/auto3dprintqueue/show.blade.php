@extends('scaffold-interface.layouts.app')
@section('title',"3d Print queue - View 3d Mod - ".$auto3dprintqueue->Name)
@section('content')

    <div class="row">
        <div class="col-md-6">
        <form method = 'get' action = '{!!url("auto3dprintqueue")!!}'>
            <button class = 'btn btn-primary'>auto3dprintqueue Index</button>

        @if($auto3dprintqueue->Status != "print" & $auto3dprintqueue->Status != "done")
            <a href="{!!$auto3dprintqueue->id!!}?printnow=true" class = 'btn btn-info'>Approve for printing</a>
        @endif
        </form>
        <section class="content" >
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

                <tr>
                    <td>
                        <b><i>Slicer Results : </i></b>
                    </td>
                    <td style="word-wrap: break-word;">{!!$auto3dprintqueue->SlicerResults!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>Size X : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->SizeX!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>Size Y : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->SizeY!!}</td>
                </tr>
                <tr>
                    <td>
                        <b><i>Size Z : </i></b>
                    </td>
                    <td>{!!$auto3dprintqueue->SizeZ!!}</td>
                </tr>

                </tbody>
            </table>
        </section>
    </div>

    <iframe src="../../../../auto3dprintqueue/{{$auto3dprintqueue->id}}/viewer" height="500px" class="col-md-6"></iframe>


</div>

@endsection
