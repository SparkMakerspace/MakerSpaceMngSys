@extends('layouts.generalpage')

@section('title')
    <h1>User Management</h1>
@endsection

@section('topButton')
    @can('create',\App\Post::class)
        <form action="{{ URL::route('users.create') }}">
            <div class="input-group pull-right">
                <button class="btn btn-primary">
                    New
                </button>
            </div>
        </form>
    @endcan
@endsection

@section('mainContent')
    {{-- Posts List --}}
    <table class="table table-hover text-center">
        @if($users->isEmpty())
            <tr>
                <td>Looks like there aren't any users quite yet...</td>
            </tr>
        @else
        <!-- Header row -->
            <tr class="info">
                <td>
                    <strong>
                        User Name
                    </strong>
                </td>
                <td>
                    <strong>
                        Email Address
                    </strong>
                </td>
                <td>
                    <strong>
                        Role
                    </strong>
                </td>
                <td>
                    <strong>
                        Admin Functions
                    </strong>
                </td>
            </tr>

        <!-- User rows -->
            @foreach ($users as $user)
                <tr id="user{{$user->id}}">
                    <td>
                        {{$user->name}}
                    </td>
                    <td>
                        {{$user->email}}
                    </td>
                    <td>
                        {{$user->role}}
                    </td>
                    <td>
                        <div class="row">
                            <div class="col-sm-4 col-md-4">
                                {!! BootForm::open([
                                'route'=>['users.edit',$user->id],
                                'method'=>'get',
                                'id'=>'editUser',
                                'class'=>'edit'
                                ]) !!}
                                {!! BootForm::submit('Edit',[
                                'class'=>'btn-link'
                                ]) !!}
                                {!! BootForm::hidden('userID',$user->id) !!}
                                {!! BootForm::close() !!}
                            </div>
                            <div class="col-sm-4 col-md-4">
                                {!! BootForm::open([
                                'url'=> '/password/email',
                                'method'=>'post'
                                ]) !!}
                                {!! BootForm::hidden('email',$user->email) !!}
                                {!! BootForm::submit('Send Pwd Reset',[
                                'class'=>'btn-link'
                                ]) !!}
                                {!! BootForm::close() !!}
                            </div>
                            <div class="col-sm-4 col-md-4">
                                {!! BootForm::open([
                                'route'=>['users.destroy',$user->id],
                                'method'=>'delete',
                                'id'=>'deleteUser',
                                'class'=>'delete'
                                ]) !!}
                                {!! BootForm::submit('Delete',[
                                'class'=>'btn-link'
                                ]) !!}
                                {!! BootForm::hidden('userID',$user->id) !!}
                                {!! BootForm::close() !!}
                            </div>
                        </div>
                    </td>
                </tr>
            @endforeach
        @endif
    </table>
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