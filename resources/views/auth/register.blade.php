@extends('scaffold-interface.layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading"><h3 style="margin: 0px">Welcome</h3></div>
                    <div class="panel-body">
                        <p>Well hey there! We're glad you've decided to join Spark Makerspace. We think that you'll love
                            everything that we have to offer. To start the registration process, we'll need some basic
                            information so we can contact you.</p>
                        <p>Don't worry, we won't share your information... much (lol just kidding)</p>
                        <form class="form-horizontal" role="form" method="POST" action="{{ url('/register') }}">
                            {{ csrf_field() }}

                            <div class="row">
                                <div class="col-md-4"><h4>The Basics</h4></div>
                            </div>

                            <div class="form-group{{ $errors->has('over13') ? ' has-error' : '' }}">
                                <label for="over13" class="col-md-4 control-label">Are you over the age of 13</label>
                                <div class="col-md-6">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" id="over13" name="over13" value="1" autofocus> Yup! (We need to ask this for legal reasons)</label>
                                    </div>
                                    @if ($errors->has('over13'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('over13') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="birthday" class="col-md-4 control-label">Birthday</label>
                                <div class="col-md-6">
                                    <input class="form-control" id="birthday" placeholder="mm/dd/yyyy" name="birthday">
                                </div>
                            </div>


                            <div class="form-group{{ $errors->has('name') ? ' has-error' : '' }}">
                                <label for="name" class="col-md-4 control-label">Legal Name</label>

                                <div class="col-md-6">
                                    <input id="name" type="text" class="form-control" name="name"
                                           placeholder="name" value="{{ old('name') }}" required>

                                    @if ($errors->has('name'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('name') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('username') ? ' has-error' : '' }}">
                                <label for="username" class="col-md-4 control-label">Username</label>

                                <div class="col-md-6">
                                    <input id="username" type="text" class="form-control" name="username"
                                           placeholder="username" value="{{ old('username') }}" required autofocus>

                                    @if ($errors->has('username'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('username') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('email') ? ' has-error' : '' }}">
                                <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                <div class="col-md-6">
                                    <input id="email" type="email" class="form-control" name="email"
                                           placeholder="maker@mail.com" value="{{ old('email') }}" required>

                                    @if ($errors->has('email'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('email') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group{{ $errors->has('phone') ? ' has-error' : '' }}">
                                <label for="phone" class="col-md-4 control-label">Phone Number</label>

                                <div class="col-md-6">
                                    <input id="phone" type="text" class="phone form-control" name="phone"
                                           placeholder="(xxx) xxx-xxxx" value="{{ old('phone') }}" required>

                                    @if ($errors->has('phone'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('phone') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4"><h4>Password</h4></div>
                            </div>

                            <div class="form-group{{ $errors->has('password') ? ' has-error' : '' }}">
                                <label for="password" class="col-md-4 control-label">Password</label>

                                <div class="col-md-6">
                                    <input id="password" type="password" class="form-control "
                                           placeholder="password (6 character minimum)" name="password" required>

                                    @if ($errors->has('password'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('password') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="password-confirm" class="col-md-4 control-label">Confirm Password</label>

                                <div class="col-md-6">
                                    <input id="password-confirm" type="password" class="form-control"
                                           placeholder="confirm" name="password_confirmation" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4"><h4>Mailing Address</h4></div>
                            </div>

                            <div class="form-group{{ $errors->has('address1') ? ' has-error' : '' }}">
                                <label for="address1" class="col-md-4 control-label">Address Line 1</label>
                                <div class="col-md-6">
                                    <input id="address1" name="address1" type="text" placeholder="address line 1"
                                           class="form-control">
                                    @if ($errors->has('address1'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('address1') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group{{ $errors->has('address2') ? ' has-error' : '' }}">
                                <label for="address2" class="col-md-4 control-label">Address Line 2</label>
                                <div class="col-md-6">
                                    <input id="address2" name="address2" type="text" placeholder="address line 2"
                                           class="form-control">
                                    @if ($errors->has('address2'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('address2') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group{{ $errors->has('city') ? ' has-error' : '' }}">
                                <label for="city" class="col-md-4 control-label">City / Town</label>
                                <div class="col-md-6">
                                    <input id="city" name="city" type="text" placeholder="city"
                                           class="form-control">
                                    @if ($errors->has('city'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('city') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group{{ $errors->has('state') ? ' has-error' : '' }}">
                                <label for="state" class="col-md-4 control-label">State</label>
                                <div class="col-md-6">
                                    <input id="state" name="state" type="text" placeholder="state"
                                           class="form-control">
                                    @if ($errors->has('state'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('state') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group{{ $errors->has('zipcode') ? ' has-error' : '' }}">
                                <label for="zipcode" class="col-md-4 control-label">Zip / Postal Code</label>
                                <div class="col-md-6">
                                    <input id="zipcode" name="zipcode" type="text" placeholder="zip or postal code"
                                           class="form-control">
                                    @if ($errors->has('zipcode'))
                                        <span class="help-block">
                                            <strong>{{ $errors->first('zipcode') }}</strong>
                                        </span>
                                    @endif
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6 col-md-offset-4">
                                    <button type="submit" class="btn btn-primary">
                                        On to the next step
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection



@push('script')
    <link rel="stylesheet" href="{{url('css/jquery.datetimepicker.min.css')}}">
    <script src="{{url('js/jquery.datetimepicker.full.min.js')}}"></script>
    <script src="{{url('js/jquery.mask.min.js')}}"></script>
    <script>
        $(function ($) {
            jQuery.datetimepicker.setLocale('en');
            $('#birthday').datetimepicker({
                timepicker:false,
                format:'Y/m/d',
                inline:true});
            $('#state').mask('SS');
            $('#phone').mask('(999) 999-9999');
            $('#fax').mask('(999) 999-9999');
            $('#zipcode').mask('99999');
        });
    </script>
@endpush