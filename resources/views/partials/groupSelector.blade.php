{{-- Use Form::group(name, selectedGroups) to instantiate this partial! --}}


@foreach(\App\Group::all() as $group)
    <div class="checkbox">
        <label><input type="checkbox"
                      @if(!is_null($selectedGroups))
                          @if(in_array($group->id,$selectedGroups->pluck('id')->toArray()))
                              checked
                          @endif
                      @endif
                      name="{{$name}}" value="{{$group->id}}">
            {{$group->name}}
        </label>
    </div>
@endforeach