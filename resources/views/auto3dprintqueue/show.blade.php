@extends('scaffold-interface.layouts.app')
@section('title',"3d Print queue - View 3d Mod - ".$auto3dprintqueue->Name)
@section('content')

    <div class="row">
        <div class="col-md-6">
            <br>
            <br>
            <form method='get' action='{!!url("auto3dprintqueue")!!}'>
                <button class='btn btn-primary'>auto3dprintqueue Index</button>
                <a data-toggle="modal" data-target="#myModal" class='delete btn btn-danger'
                   data-link="/auto3dprintqueue/{!!$auto3dprintqueue->id!!}/deleteMsg">delete</a>
                @if($auto3dprintqueue->Status != "print" & $auto3dprintqueue->Status != "done")

                    <a data-toggle="modal" data-target="#myModal" class='viewShow btn btn-info'
                       data-link='/auto3dprintqueue/{!!$auto3dprintqueue->id!!}?printnow=true'>Approve</a>

                @endif
            </form>
            <section class="content">
                <h1>
                    {!!$auto3dprintqueue->Name!!}
                </h1>
                <br>

                <img src="../../../../auto3dprintqueue/{{$auto3dprintqueue->id}}/thumb.png" width="20%" height="20%" ></img>
                <br>

                <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#SlicerSettings">
                    Edit Slicer Settings
                </button>


                <form method='POST' action='{!! url("auto3dprintqueue")!!}/{!!$auto3dprintqueue->id!!}/update'>
                    <div class="modal fade" id="SlicerSettings" tabindex="-1" role="dialog"
                         aria-labelledby="myModalLabel">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span
                                                aria-hidden="true">&times;</span></button>
                                    <h4 class="modal-title" id="myModalLabel">Slicer Settings</h4>
                                </div>
                                <div class="modal-body">
                                    <input type='hidden' name='_token' value='{{Session::token()}}'>
                                    <div class="form-group">
                                        <label for="Name">Name</label>
                                        {!!$auto3dprintqueue->Name!!}
                                    </div>


                                    <div class="form-group">
                                        <label>Generate Support</label>
                                        {{Form::select('genenerateSupport', array('1' => 'on', '0' => 'off'), $auto3dprintqueue->genenerateSupport)}}
                                    </div>

                                    <div class="form-group">
                                        <label for="Infill">Infill</label>
                                        <input id="Infill" name="Infill" type="range" min="20" max="99"
                                               oninput="InfillOutput.value = Infill.value +'%'"
                                               value="{!!$auto3dprintqueue->Infill!!}">
                                        <output name="InfillOutput" id="InfillOutput">{!!$auto3dprintqueue->Infill!!}%
                                        </output>
                                    </div>
                                    <div class="form-group">
                                        <label for="Status">Status</label>
                                        {!!$auto3dprintqueue->Status!!}
                                    </div>


                                    <div class="form-group">
                                        <label>auto3dprintmaterials Select</label>
                                        <select name='auto3dprintmaterial_id' class="form-control">
                                            @foreach($auto3dprintmaterials as $key => $value)
                                                <option value="{{$key}}">{{$value}}</option>
                                            @endforeach
                                        </select>
                                    </div>


                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                    <button class='btn btn-primary' type='submit'>Update</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>


                <table class='table table-bordered'>
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
                    <tr>
                        <td>
                            <b><i>Qty of Filament (mm): </i></b>
                        </td>
                        <td>{!!$auto3dprintqueue->filament_used!!}</td>
                    </tr>



                    </tbody>
                </table>
            </section>
        </div>

        <iframe src="../../../../auto3dprintqueue/{{$auto3dprintqueue->id}}/viewer" height="500px"
                class="col-md-6"></iframe>


    </div>

@endsection
