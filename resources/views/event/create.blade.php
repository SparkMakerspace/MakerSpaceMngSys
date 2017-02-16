@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

    <section class="content">
        <h1>
            Create event
        </h1>
        <form method = 'get' action = '{!!url("event")!!}'>
            <button class = 'btn btn-danger'>event Index</button>
        </form>
        <br>
        <form method = 'POST' action = '{!!url("event")!!}'>
            <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
            <div class="form-group">
                <label for="name">name</label>
                <input id="name" name = "name" type="text" class="form-control">
            </div>
            <div class="form-group">
                <label for="startDateTime">startDateTime</label>
                @include('partials.datePicker',['fieldName'=>'startDateTime'])
            </div>
            <div class="form-group">
                <label for="endDateTime">endDateTime</label>
                @include('partials.datePicker',['fieldName'=>'endDateTime'])
            </div>
            <div class="form-group">
                <label for="description">description</label>
                <input id="description" name = "description" type="text" class="form-control">
            </div>
            <div class="checkbox">
                <label><input type="checkbox" id="allDay" name="allDay">All Day Event?</label>
            </div>
            @include('partials.groupSelector')
            <button class = 'btn btn-primary' type ='submit'>Create</button>
        </form>
        <script>
            $(function () {
                $('#startDateTime').datetimepicker({format:'YYYY-MM-DD HH:mm'});
                $('#startDateTime').on("dp.change", function (e) {
                    $('#endDateTime').data("DateTimePicker").minDate(e.date);
                });
                $('#endDateTime').datetimepicker({format:'YYYY-MM-DD HH:mm',useCurrent:false});
                $('#endDateTime').on("dp.change", function (e) {
                    $('#startDateTime').data("DateTimePicker").maxDate(e.date);
                });
            });
            $(function(){
                $('#allDay').click(function () {
                    if (this.checked){
                        $('#startDateTime').data('DateTimePicker').format('YYYY-MM-DD');
                        $('#endDateTime').data('DateTimePicker').format('YYYY-MM-DD');
                    }
                    else {
                        $('#startDateTime').data('DateTimePicker').format('YYYY-MM-DD HH:mm');
                        $('#endDateTime').data('DateTimePicker').format('YYYY-MM-DD HH:mm');
                    }
                })
            })
        </script>
    </section>
@endsection