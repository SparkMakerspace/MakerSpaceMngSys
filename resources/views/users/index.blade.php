@extends('layouts.app')

@section('title')
    <div class="row">
            <h1>User Management</h1>
            @can('create',\App\Post::class)
                <div class="w3-container">
                    <a href="{{route('users.create')}}" class="w3-btn-floating w3-theme-d1">
                        {!!FA::icon('plus')!!}
                    </a>
                </div>
            @endcan
    </div>
@endsection

@section('content')

@endsection

@section('footer')
    {{$users->links()}}
@endsection

@section('postJquery')
    @parent
    //<script> //This is here for IDE syntax highlighting
        $( ".delete" ).on( "submit", function() {

            var $userID;
            $userID = $( this ).find( "input[name=userID]" ).val();
            var $userTag;
            $userTag = "#user";
            $userTag = $userTag.concat($userID);

            $.post(
                $( this ).prop( "action" ),
                {
                    "_token": $( this ).find( "input[name=_token]" ).val(),
                    "_method": $( this ).find( "input[name=_method]" ).val(),
                    "id": $userID
                },
                function(data, status){
                    $( $userTag ).html("<td colspan=4 class='text-left bg-danger'>"+data+"</td>");
                    $( $userTag ).fadeOut(5000);
                }
            );
            //prevent the form from actually submitting in browser
            return false;
        } );
@endsection