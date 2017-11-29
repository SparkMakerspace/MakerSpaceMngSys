@extends('scaffold-interface.layouts.app')
@section('title','Edit')
@section('content')

    <body onload="updatelistbox();">

    <div class="panel-group" id="accordion">
        <div class="panel panel-default">
            <div class="panel-heading">
                <h4 class="panel-title">
                    <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">Group Memberships</a>
                </h4>
            </div>
            <div id="collapse1" class="panel-collapse collapse">
                <div class="panel-body">


                    <form method = 'get' action = '{!!url("cadmodel")!!}'>
                        <button class = 'btn btn-danger'>cadmodel Index</button>
                    </form>
                    <br>
                    <form method = 'POST' action = '{!! url("cadmodel")!!}/{!!$cadmodel->
        id!!}/update'>
                        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
                        <div class="form-group">
                            <label for="Name">Name</label>
                            <input id="Name" name = "Name" type="text" class="form-control" value="{!!$cadmodel->
            Name!!}">
                        </div>
                        <div class="form-group">
                            <label for="Description">Description</label>
                            <input id="Description" name = "Description" type="text" class="form-control" value="{!!$cadmodel->
            Description!!}">
                        </div>
                        <div class="form-group">
                            <label for="ModelFile">ModelFile</label>
                            <textarea id="ModelFile" name = "ModelFile" type="textarea"  >{!!$cadmodel->ModelFile!!}</textarea>
                        </div>
                        <div class="form-group">
                            <label for="Material">Material</label>
                            <input id="Material" name = "Material" type="text" class="form-control" value="{!!$cadmodel->
            Material!!}">
                        </div>
                        <button class = 'btn btn-primary' type ='submit'>Update</button>
                    </form>

                </div>
            </div>
        </div>
    </div>










    <script>
        function listKeys()
        {
            alert("grabling all the file for the current file");
            var keyIndex = 0;
            var thisKey = window.localStorage.key(keyIndex);

            while(thisKey != '' && thisKey != undefined)
            {
                if (thisKey.substr(0, 2) == 'TCAD.projects.')
                {
                    alert(thisKey);
                }

                keyIndex+= 1;
                thisKey = window.localStorage.key(keyIndex);
            }
        }




        function ExportToLocalFile()
        {
            alert("hello ");
            var bla;
            var lengthOfLocalStorage = localStorage.length;
            bla = lengthOfLocalStorage.toString();
            for(var i=0, len=localStorage.length; i<len; i++)
            {
                if (localStorage.key(i).substr(0, {!! strlen('TCAD.projects.'. $cadmodel->id) !!}) == '{!! 'TCAD.projects.'. $cadmodel->id !!}')
                {

                    var key = localStorage.key(i);
                    var value = localStorage[key];

                    bla += "\n" + key +"\n" + value;
                }

            }

            alert( localStorage[key]);
            $('#ModelFile').val(bla);
            //exportTextData(bla,"export.web-cad");
        }

        //localStorage.setItem("bla","blabla");

        $(function () {

            $(window).bind('storage', function (e) {
                ExportToLocalFile();
            });

            localStorage.setItem('a', 'test');

        });


        function readSingleFile(e) {
            var file = e.target.files[0];
            if (!file) {
                return;
            }
            var reader = new FileReader();
            reader.onload = function(e)
            {
                var data = e.target.result;
                var arrayOfLines = data.split("\n");
                alert(arrayOfLines[0]);

                for (var i = 0; i < arrayOfLines[0]; i++)
                {
                    localStorage.setItem(arrayOfLines[i*2+1],arrayOfLines[i*2+2]);
                }
            };
            reader.readAsText(file);
        }


        ExportToLocalFile();

    </script>


<iframe src="../../../../../webcad/?{!!$cadmodel->id!!}}" style="position: absolute;

bottom: 0;
height:85%;
width:85%;"></iframe>


@endsection