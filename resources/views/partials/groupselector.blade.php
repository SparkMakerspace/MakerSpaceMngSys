{{--    Expects parameter:
            selectedGroups: an array of group ids that should be selected
        This partial should be surrounded by form tags.
--}}
@foreach(\App\Group::all() as $group)
    <div class="checkbox">
        <label><input type="checkbox" @if(array_has($selected,$group->name)) checked @endif >{{$group->name}}</label>
    </div>
@endforeach