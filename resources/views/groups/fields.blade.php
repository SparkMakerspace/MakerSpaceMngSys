<!-- Name Field -->
<div class="form-group col-sm-6">
    {!! Form::label('name', 'Name:') !!}
    {!! Form::text('name', null, ['class' => 'form-control']) !!}
</div>

<!-- Image Id Field -->
<div class="form-group col-sm-6">
    {!! Form::label('image_id', 'Image Id:') !!}
    {!! Form::number('image_id', null, ['class' => 'form-control']) !!}
</div>

<!-- Submit Field -->
<div class="form-group col-sm-12">
    {!! Form::submit('Save', ['class' => 'btn btn-primary']) !!}
    <a href="{!! route('groups.index') !!}" class="btn btn-default">Cancel</a>
</div>
