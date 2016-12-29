
<div class="w3-btn-group w3-justify">
    @php
    if (isset($user)){
        $checked = $user->groups()->get()->modelKeys();
    } elseif (isset($post)){
        $checked = $post->groups()->get()->modelKeys();
    } else{
        $checked = [];
    }
    @endphp
    @foreach(\App\Group::getGroups() as $group)
        <div class="w3-col m2">
            <input type="checkbox"
                   name="group[{{$group->id}}]"
                   autocomplete="off"
                   class="w3-check"
                   {{in_array($group->id,$checked)?'checked="checked"':''}}
            >
            <label class="w3-validate">{{$group->name}}</label>
        </div>
    @endforeach
</div>