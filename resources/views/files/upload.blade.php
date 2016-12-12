<div class="w3-container">
    @if(Session::has('success'))
        <div class="w3-panel w3-green">
            <h2>{!! Session::get('success') !!}</h2>
        </div>
    @endif
    <div>Upload image</div>
    {!! Form::open(array('url'=>route('files.store'),'method'=>'POST', 'files'=>true)) !!}
        <div class="w3-input">
            {!! Form::file('image') !!}
            <p class="w3-panel w3-pale-red w3-text-red">{!!$errors->first('image')!!}</p>
            @if(Session::has('error'))
                <p class="w3-panel w3-pale-red w3-text-red">{!! Session::get('error') !!}</p>
            @endif
        </div>
    {!! Form::submit('Submit', array('class'=>'w3-btn w3-blue')) !!}
    {!! Form::close() !!}
</div>