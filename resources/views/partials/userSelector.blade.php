{{--

Drop down selector for a user.
NOTE: cannot be instantiated more than once in the same form.

Optional Parameters:
    $name: name of this instance
        else, field name is "user"
    $label: label for this instance
        else, field label is "Select User"
    $selectedUser: the default selection
        else, no user selected
    $users: collection of users to select from
        else, all users selectable
--}}

@php
    if(!isset($selectedUser))
    {
    $selectedUser = null;
    }
    if(!isset($users))
    {
    $users = \App\User::all();
    }
    if(!isset($name))
    {
    $name = 'user';
    }
    if(!isset($label)){
    $label = 'Select User';
    }
@endphp

<label for="{{$name}}">{{$label}}</label>
<select id="{{$name}}" class="user form-control" name="{{$name}}">
    @if($selectedUser == null)
        <option selected></option>
    @endif
    @foreach($users as $user)
        <option @if($selectedUser == $user) selected @endif >{{$user->name}}</option>
    @endforeach
</select>