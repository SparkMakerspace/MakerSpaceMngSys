{{--    Expects parameter:
            selectedGroups: an optional array of group ids that should be selected
        This partial should be surrounded by form tags.
--}}
@foreach(\App\Group::all() as $group)
    <div class="checkbox">
        <label><input type="checkbox"
                      @if(isset($selectedGroups))
                          @if(in_array($group->id,$selectedGroups->pluck('id')->toArray()))
                              checked
                          @endif
                      @endif
                      name="group[]" value="{{$group->id}}">
            {{$group->name}}
        </label>
    </div>
@endforeach