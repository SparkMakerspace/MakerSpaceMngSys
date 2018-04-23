{{--    Expects parameter:
            fieldName: a string that sets the name of the field
            value: optional old value string
        This partial should be surrounded by form tags.
        Include the following for each field:

    <script type="text/javascript">
        $(function () {
            $('#{{$fieldName}}').datetimepicker();
        });
    </script>
--}}

@php
if(!isset($value)){
    $value = Illuminate\Support\Carbon::now();
}
if(!isset($fieldName)){
    $fieldName = 'dateTime';
}
@endphp

<div class='input-group date'>
    <input type='text' class="form-control" id='{{$fieldName}}' name="{{$fieldName}}" value="{{$value}}" />
</div>

<script>
    $(function () {
        $({{ $fieldName }}).datetimepicker({
            format: 'Y-m-d H:i:00'
        });
    });
</script>

@push('script')
    <link rel="stylesheet" href="{{url('css/jquery.datetimepicker.min.css')}}">
    <script src="{{url('js/jquery.datetimepicker.full.min.js')}}"></script>
    <script>
        $(function ($) {
            jQuery.datetimepicker.setLocale('en');
        }
    </script>
@endpush