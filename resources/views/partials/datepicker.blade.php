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

<div class='input-group date'>
    <input type='text' class="form-control" id='{{$fieldName}}' name="{{$fieldName}}" @if(isset($value)) value="{{$value}}" @endif />
</div>


