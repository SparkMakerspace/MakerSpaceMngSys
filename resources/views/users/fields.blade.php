<!-- Name Field -->
<div class="form-group col-sm-6">
    {!! Form::label('name', 'Full Name:') !!}
    {!! Form::text('name', null, ['class' => 'form-control']) !!}
</div>

<!-- Username Field -->
<div class="form-group col-sm-6">
    {!! Form::label('username', 'Username:') !!}
    {!! Form::text('username', null, ['class' => 'form-control']) !!}
</div>

<!-- Email Field -->
<div class="form-group col-sm-6">
    {!! Form::label('email', 'Email:') !!}
    {!! Form::email('email', null, ['class' => 'form-control']) !!}
</div>

<!-- Phone Field -->
<div class="form-group col-sm-6">
    {!! Form::label('phone', 'Phone:') !!}
    {!! Form::text('phone', null, ['class' => 'form-control']) !!}
</div>

<!-- Streetaddress Field -->
<div class="form-group col-sm-6 ">
    {!! Form::label('streetAddress', 'Address:') !!}
    {!! Form::text('streetAddress', null, ['class' => 'form-control','placeholder'=>'Street Address']) !!}
    {!! Form::text('streetAddress2', null, ['class' => 'form-control','placeholder'=>'']) !!}
        <div class="form-inline">
        <!-- Cityaddress Field -->
        {{--<div class="col-sm-6">--}}
            {!! Form::text('cityAddress', null, ['class' => 'form-control','placeholder'=>'City']) !!}
        {{--</div>--}}
        <!-- Stateaddress Field -->
        {{--<div class="col-sm-2">--}}
            {!! Form::text('stateAddress', null, ['class' => 'form-control','placeholder'=>'CT','maxlength'=>'2','size'=>'2']) !!}
        {{--</div>--}}
        <!-- Zipaddress Field -->
        {{--<div class="col-sm-4">--}}
            {!! Form::text('zipAddress', null, ['class' => 'form-control','placeholder'=>'ZIP','maxlength'=>'5','size'=>'5']) !!}
        {{--</div>--}}
        </div>
</div>
<!-- Contactpref Field -->
{{--<div class="form-group col-sm-6">--}}
    {{--{!! Form::label('contactPref', 'Contactpref:') !!}--}}
    {{--{!! Form::select('contactPref', ['Email' => 'Email', 'Push' => 'Push', 'EmailAndPush' => 'Email And Push'], null, ['class' => 'form-control']) !!}--}}
{{--</div>--}}{!! Form::hidden('contactPref','Email') !!}

@if(!$register)
<!-- Keycard Field -->
<div class="form-group col-sm-6">
    {!! Form::label('keyCard', 'Keycard:') !!}
    {!! Form::text('keyCard', null, ['class' => 'form-control']) !!}
</div>

<!-- Role Field -->
<div class="form-group col-sm-6">
    {!! Form::label('role', 'Role:') !!}
    {!! Form::select('role', ['user' => 'user', 'admin' => 'admin'], null, ['class' => 'form-control']) !!}
</div>

<!-- Active Field -->
<div class="form-group col-sm-6">
    {!! Form::label('active', 'Active:') !!}
    <label class="checkbox-inline">
        {!! Form::hidden('active', false) !!}
        {!! Form::checkbox('active', 'yes', null) !!} yes
    </label>
</div>
@endif

<!-- Password Field -->
<div class="form-group col-sm-6">
    {!! Form::label('password', 'Password:') !!}
    {!! Form::password('password', ['class' => 'form-control','placeholder'=>'Password']) !!}
    {!! Form::password('password_confirmation', ['class' => 'form-control','placeholder'=>'Confirm']) !!}
</div>

@if(!$register)
<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('users.index') !!}" class="btn btn-default">Cancel</a>
</div>
@endif