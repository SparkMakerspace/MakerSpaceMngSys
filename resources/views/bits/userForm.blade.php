{{--Usermane (STATIC) Can not be changed--}}
<div class="form-group">
    {!! Form::label('username','Username:',['class'=>'col-md-2 control-label']) !!}
    <div class="col-md-10">
        @if(isset($user))
        <p class ='form-control-static'>{{$user->username}}</p>
        @else
        {!! Form::text('username',null,['class'=>'form-control']) !!}
        @endif
    </div>
    @if ($errors->has('username'))
        <span class="help-block">
                <strong>{{ $errors->first('username') }}</strong>
            </span>
    @endif
</div>

{{--Full Name--}}
<div class="form-group">
    {!! Form::label('name','Full Name:',['class'=>'col-md-2 control-label']) !!}
    <div class="col-md-10">
        {!! Form::text('name',null,['class'=>'form-control']) !!}
    </div>
    @if ($errors->has('name'))
        <span class="help-block">
                <strong>{{ $errors->first('name') }}</strong>
            </span>
    @endif
</div>

{{--Email Address--}}
<div class="form-group">
    {!! Form::label('email','Email Address:',['class'=>'col-md-2 control-label']) !!}
    <div class="col-md-10">
        {!! Form::email('email',null,['class'=>'form-control']) !!}
    </div>
    @if ($errors->has('email'))
        <span class="help-block">
                <strong>{{ $errors->first('email') }}</strong>
            </span>
    @endif
</div>

{{--Password--}}
<div class="form-group">
    {!! Form::label('password','Password:',['class'=>'col-md-2 control-label']) !!}
    <div class="col-md-10">
        {!! Form::password('password',['class'=>'form-control']) !!}
    </div>
    @if ($errors->has('password'))
        <span class="help-block">
                <strong>{{ $errors->first('password') }}</strong>
            </span>
    @endif
</div>
{{--Password Confirmation--}}
<div class="form-group">
    {!! Form::label('password_confirmation','Confirm:',['class'=>'col-md-2 control-label']) !!}
    <div class="col-md-10">
        {!! Form::password('password_confirmation',
        ['id'=>'confirm_password',
        'class'=>'form-control']) !!}
    </div>
    @if ($errors->has('password_confirmation'))
        <span class="help-block">
                <strong>{{ $errors->first('password_confirmation') }}</strong>
            </span>
    @endif
</div>