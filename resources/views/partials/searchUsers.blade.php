{{--

Smart search partial for users

Required Parameter:
    none.

Optional Parameters:
    $name: name of this instance
        else, field name is "users[]"
    $label: label for this instance
        else, field label is "Select User"
    $selectedUsers: the default selection as a collection of Users
        else, no user selected
--}}

@section('content')
    @php
        if(!isset($selectedUsers))
        {
        $selectedUsers = [];
        }
        if(!isset($name))
        {
        $name = 'user';
        }
        if(!isset($label))
        {
        $label = 'Search Users';
        }
    @endphp

    <label for="{{$name}}">{{$label}}</label>
    <input id="{{$name}}" class="user-search form-control" name="{{$name}}" placeholder="Type a user's name here and click on a suggestion to add">
    <div class="list-group">
        <div class="user-search-suggestions">

        </div>
    </div>
    <label>Selected Users</label>
    <div class="list-group user-search-selected-list">
        @foreach($selectedUsers as $user)
            <a href="#" onclick="removeUser({{$user->id}})" id="{{$user->id}}" class="list-group-item user-search-selected" data-toggle="tooltip" title="Click to remove">{{$user->username}}&emsp;{{$user->name}} {!! Form::hidden($name.'[]',$user->id) !!}</a>
        @endforeach()
    </div>
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        var users = [];
        $(function(){
            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                }
            });
            $('#{{$name}}').keyup(searchUsers);
            $('a.user-search-suggestion').click(addUser);
        });

        function searchUsers() {
            var searchString = $('#{{$name}}').val();
            $.post('searchUsers',
                {query: searchString
                }, showSuggestions,'json');
        }

        function showSuggestions(data) {
            var suggestions = $('div.user-search-suggestions');
            suggestions.empty();
            users = data;
            for (var user in data){
                if(data.hasOwnProperty(user)){
                    suggestions.append(suggestionTag(data[user]));
                }
            }
        }

        function suggestionTag(user) {
            var result = document.createElement("A");
            result.setAttribute('class','list-group-item user-search-suggestion');
            result.setAttribute('href','#');
            result.setAttribute('id',user['id']);
            result.setAttribute('onClick','addUser('+user['id']+')');
            var text = document.createTextNode(user["username"]+' '+user['name']);
            result.appendChild(text);
            return result;
        }
        
        function addUser(id) {
            if ($('a.user-search-selected[id='+id+']').length){
                return;
            }
            var user = users.map(function (user_inner) {
                if (user_inner['id'] === id) {
                    return user_inner;
                } else {
                    return null;
                }
            });
            var result = document.createElement("A");
            user = user[0];
            result.setAttribute('href','#');
            result.setAttribute('class','list-group-item user-search-selected');
            result.setAttribute('id',user['id']);
            result.setAttribute('onClick','removeUser('+user['id']+')');
            result.setAttribute('data-toggle','tooltip');
            result.setAttribute('title','');
            result.setAttribute('data-original-title','Click to remove');
            var text = document.createTextNode(user["username"]+' '+user['name']);
            result.appendChild(text);
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute('name','{{$name}}[]');
            hiddenField.setAttribute('type','hidden');
            hiddenField.setAttribute('value',user['id']);
            result.appendChild(hiddenField);
            $('div.user-search-selected-list').append(result);
        }

        function removeUser(id){
            $('a.user-search-selected[id='+id+']').remove();
            $('div.tooltip').fadeOut();
            return false;
        }
    </script>
@endsection()