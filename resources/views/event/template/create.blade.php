@extends('scaffold-interface.layouts.app')
@section('title','Create')
@section('content')

    <section class="content">
        <h1>
            Create Event Template
        </h1>
        <form method = 'get' action = '{!!url("event")!!}'>
            <button class = 'btn btn-danger'>Back to Event Templates</button>
        </form>
        <br>
        {!! Form::open(['url'=> 'event/template','method'=>'post']) !!}
        <input type = 'hidden' name = '_token' value = '{{Session::token()}}'>
        <select class="form-control" name="type" id="type">
            <option disabled selected>Choose a template type</option>
            <option value="event">Event</option>
            <option value="class">Class</option>
        </select>
        <input type="hidden" name="is_template" value="1">
        <br>
        <div class="form-group">
            {!! Form::label('name', 'Name');  !!}
            {!! Form::text('name',null,['class'=>'form-control'])!!}
        </div>
        <div class="form-group">
            {!! Form::label('description', 'Description');  !!}
            {!! Form::textarea('description',null,['class'=>'form-control','rows'=>3])!!}
        </div>
        <div class="form-group">
            {!! Form::label('num_Sessions', 'How many sessions make up this event?');  !!}
            {!! Form::number('num_Sessions',1,['min'=>1,'class'=>'form-control']) !!}
            <!-- TODO: Add javascript logic to create session fields-->
        </div>
        <div class="sessions">
            <span session="1">
                <h4>Session 1</h4>
                <div class="form-group">
                    {!! Form::label('session_title[]','Session Name') !!}
                    {!! Form::text('session_title[]',null,['class'=>'form-control']) !!}
                </div>
            </span>
        </div>
        <button type="submit" class="btn btn-default" id="submitbutton" value="save">Save Draft</button>
        <button type="submit" class="btn btn-default" id="subitbutton" value="submit">Submit for Approval</button>
        {!! Form::close() !!}

        <script>
            var $numSessions = 1;
            function hideOthers() {
                $('#type option').map(
                    function () {
                        if ($(this).val() !== $("#type").val()) {
                            $("." + $(this).val()).hide();
                        }
                    }
                );
            }
            function instantiateSessions($number){
                if ($number > $numSessions) {
                    while($number - $numSessions > 0) {
                        $numSessions = $numSessions + 1;
                        if ($('span[session='+$numSessions+']').length){
                            $('span[session='+$numSessions+']').show();
                        } else {
                            var $temp = $('span[session="1"]').clone().attr('session', $numSessions);
                            $temp.children('h4').html('Session ' + $numSessions);
                            $temp.appendTo('.sessions');
                        }
                    }
                } else if ($number < $numSessions) {
                    while ($number - $numSessions < 0){
                        $('span[session='+$numSessions+']').hide();
                        $numSessions = $numSessions - 1;
                    }
                }
            }
            $(document).ready(
                function(){
                    $("#type").change(
                        function(){
                            var $selected = $(this).val();
                            $("." + $selected).show();
                            hideOthers();
                        });
                    $("#num_Sessions").change(function(){
                        instantiateSessions(parseInt($(this).val()));
                    })
                });
            hideOthers();
        </script>
    </section>
@endsection