@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <section class="content">
        <div class="panel-group" id="accordion">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h4 class="panel-title">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Model Properties.</a>
                    </h4>
                </div>
                <div id="collapse1" class="panel-collapse collapse">
                    <div class="panel-body">


                        <form method='get' action='{!!url("cadmodel")!!}'>
                            <button class='btn btn-danger'>cadmodel Index</button>
                        </form>
                        <br>
                        <form method='POST' action='{!! url("cadmodel")!!}/{!!$cadmodel->
        id!!}/update'>
                            <input type='hidden' name='_token' value='{{Session::token()}}'>
                            <div class="form-group">
                                <label for="Name">Name</label>
                                <input id="Name" name="Name" type="text" class="form-control" value="{!!$cadmodel->
            Name!!}">
                            </div>
                            <div class="form-group">
                                <label for="Description">Description</label>
                                <input id="Description" name="Description" type="text" class="form-control" value="{!!$cadmodel->
            Description!!}">
                            </div>
                            <div class="form-group">
                                <label for="ModelFile">ModelFile</label>
                                <textarea id="ModelFile" name="ModelFile"
                                          type="textarea">{!!$cadmodel->ModelFile!!}</textarea>
                            </div>
                            <div class="form-group">
                                <label for="Material">Material</label>
                                <input id="Material" name="Material" type="text" class="form-control" value="{!!$cadmodel->
            Material!!}">
                            </div>

                            <div class="form-group">
                                <label for="STLFile">ModelFile</label>
                                <textarea id="STLFile" name="STLFile"
                                          type="textarea"></textarea>
                            </div>


                            <button class='btn btn-primary' type='submit'>Update</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>


        <script>

            readSingleFile();

            function purgelocalfile() {
                var bla = [];
                for (var i = 0, len = localStorage.length; i < len; i++) {
                    if (localStorage.key(i).substr(0, {!! strlen('TCAD.projects.'. $cadmodel->id) !!}) == '{!! 'TCAD.projects.'. $cadmodel->id !!}') {
                        bla[i] = localStorage.key(i);
                    }
                }

                len = localStorage.length
                for (var i = 0; i < len; i++) {

                        localStorage.removeItem(bla[i]);

                }

            }

            function readSingleFile(e) {
                reading = 1;
                purgelocalfile();
                var arrayOfLines = $('#ModelFile').val().split("\n");
                //alert(arrayOfLines[0]);

                for (var i = 0; i < arrayOfLines[0]; i++) {
                    localStorage.setItem(arrayOfLines[i * 2 + 1], arrayOfLines[i * 2 + 2]);
                }
                reading = 0;
            }



            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });


            function ExportToLocalFile() {
                if (reading == 1) return;
                var bla;
                var lengthOfLocalStorage = localStorage.length;
                bla = lengthOfLocalStorage.toString();
                for (var i = 0, len = localStorage.length; i < len; i++) {
                    if (localStorage.key(i).substr(0, {!! strlen('TCAD.projects.'. $cadmodel->id) !!}) == '{!! 'TCAD.projects.'. $cadmodel->id !!}')
                    {

                        if (localStorage.key(i).indexOf(".stl") == -1)
                        {

                            var key = localStorage.key(i);
                            var value = localStorage[key];

                            bla += "\n" + key + "\n" + value;
                        }
                        else
                        {
                            var key = localStorage.key(i);
                            var value = localStorage[key];
                            alert(value);
                            $('#STLFile').val( value);
                            $.post( "updatemodelstl", $( "#STLFile" ).serialize() );
                        }

                    }

                }

                //alert(localStorage[key]);
                $('#ModelFile').val(bla);
                $.post( "updatemodel", $( "#ModelFile" ).serialize() );
                //exportTextData(bla,"export.web-cad");
            }






            $(function () {

                $(window).bind('storage', function (e) {
                    ExportToLocalFile();
                });

                localStorage.setItem('a', 'test');

            });




            //ExportToLocalFile();
            $(document).ready(SetIframeSize);

            // resize on window resize
            $(window).on('resize', SetIframeSize);

            function SetIframeSize() {
                $("#cad").width($(window).width() - 275); // added margin for scrollbars
                $("#cad").height($(window).height() - 150);
            }


        </script>

        <iframe id='cad' src="../../../../../webcad/?{!!$cadmodel->id!!}}" onload="resizeIframe(this)"></iframe>
    </section>


@endsection