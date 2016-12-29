<div class="">
    {{--Usermane (STATIC) Can not be changed--}}
    <div class="w3-section">
        @if(isset($user))
            {!! Form::text('username',null,
            ['class'=>'w3-input w3-border w3-disabled',
            'style'=>'width:33.33%',
            'disabled']) !!}
            {!! Form::label('username','Username',
            ['class'=>'w3-label']) !!}
        @else
            {!! Form::text('username',null,
            ['class'=>'w3-input w3-border w3-animate-input',
            'style'=>'width:33.33%',
            'required',
            'placeholder'=>'Username']) !!}
            {!! Form::label('username','Username',
            ['class'=>'w3-label w3-validate']) !!}
        @endif
        @if ($errors->has('username'))
            <span class="w3-pale-red w3-text-red">
                <strong>{{ $errors->first('username') }}</strong>
            </span>
        @endif
    </div>

    {{--Full Name--}}
    <div class="w3-section">
        {!! Form::text('name',null,
        ['class'=>'w3-input w3-border w3-animate-input',
        'style'=>'width:33.33%',
        'required',
        'pattern'=>'[A-Za-z-]+ [A-Za-z -]+',
        'placeholder'=>'Full Name']) !!}
        {!! Form::label('name','Full Name',
        ['class'=>'w3-label w3-validate']) !!}
        @if ($errors->has('name'))
            <span class="w3-pale-red w3-text-red">
                <strong>{{ $errors->first('name') }}</strong>
            </span>
        @endif
    </div>

    {{--Email Address--}}
    <div class="w3-section">
        {!! Form::email('email',null,
        ['class'=>'w3-input w3-border w3-animate-input',
        'style'=>'width:33.33%',
        'required',
        'placeholder'=>'Email Address']) !!}
        {!! Form::label('email','Email Address',
        ['class'=>'w3-label w3-validate']) !!}
        @if ($errors->has('email'))
            <span class="w3-pale-red w3-text-red">
                <strong>{{ $errors->first('email') }}</strong>
            </span>
        @endif
    </div>

    {{--Password--}}
    <div class="w3-section">
        @if(isset($user))
            {!! Form::password('password',
            ['class'=>'w3-input w3-border w3-animate-input',
            'style'=>'width:33.33%',
            'id'=>'password',
            'pattern'=>'(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
            'placeholder'=>'Password (leave blank to keep unchanged)']) !!}
        @else
            {!! Form::password('password',
            ['class'=>'w3-input w3-border w3-animate-input',
            'style'=>'width:33.33%',
            'id'=>'password',
            'required',
            'pattern'=>'(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}',
            'placeholder'=>'Password']) !!}
        @endif
        {!! Form::label('password','Password',
        ['class'=>'w3-label w3-validate']) !!}
        @if ($errors->has('password'))
            <span class="w3-pale-red w3-text-red">
                <strong>{{ $errors->first('password') }}</strong>
            </span>
        @endif
    </div>
    <div class="w3-section">
        {{--Password Confirmation--}}
        @if(isset($user))
            {!! Form::password('password_confirmation',
            ['id'=>'confirm_password',
            'style'=>'width:33.33%',
            'class'=>'w3-input w3-border w3-animate-input',
            'placeholder'=>'Confirm Password']) !!}
        @else
            {!! Form::password('password_confirmation',
            ['id'=>'confirm_password',
            'style'=>'width:33.33%',
            'class'=>'w3-input w3-border w3-animate-input',
            'required',
            'placeholder'=>'Confirm Password']) !!}
        @endif
        {!! Form::label('password_confirmation','Confirm Password',
        ['class'=>'w3-label w3-validate']) !!}
        @if ($errors->has('password_confirmation'))
            <span class="w3-pale-red w3-text-red">
                <strong>{{ $errors->first('password_confirmation') }}</strong>
            </span>
        @endif
    </div>

    <script>
        var password = document.getElementById("password")
            , confirm_password = document.getElementById("confirm_password");

        function validatePassword(){
            if(password.value != confirm_password.value) {
                confirm_password.setCustomValidity("Passwords Don't Match");
            } else {
                confirm_password.setCustomValidity('');
            }
        }

        password.onchange = validatePassword;
        confirm_password.onkeyup = validatePassword;
    </script>
</div>