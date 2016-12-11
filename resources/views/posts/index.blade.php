@extends('layouts.app')

@section('page-div')
    <div class="w3-deep-orange" style="margin-top: 40px">
@endsection

@section('title')
    <h1>Posts</h1>
    @can('create',\App\Post::class)
        <form action="{{ URL::route('posts.create') }}">
            <button class="w3-btn w3-blue">
                New Post
            </button>
        </form>
    @endcan
@endsection

@section('content')
    {{-- Holds the Post cards --}}
    <div class="w3-row-padding">
        @if($posts->isEmpty())
            <div class="w3-card-2 w3-red w3-hover-dark-gray w3-margin-top w3-container">
                <h4>Looks like there aren't any posts quite yet...</h4>
            </div>
        @else
            @foreach ($posts as $post)
                @if(($loop->index+1) % 2 )
                    </div><div class="w3-row-padding">
                @endif
                {{-- This div is the Post card --}}
            <div class="w3-half">
                <div class="w3-card-2 w3-light-gray w3-section">

                    {{-- This div is for the Post header --}}
                    <div class="w3-border-bottom w3-row w3-padding-4">

                        {{-- This div is for the owner actions on the right of the header --}}
                        <div class="w3-col m2 w3-right w3-btn-group">
                            @can('delete',$post)
                                <form action="{{ URL::route('posts.destroy',$post) }}" method="POST">
                                    <input type="hidden" name="_method" value="DELETE">
                                    <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                    <button class="w3-btn w3-red w3-small w3-right w3-padding-small">
                                        <i class="fa fa-times"></i>
                                    </button>
                                </form>
                            @endcan
                            @can('update',$post)
                                <form action="{{ URL::route('posts.edit',$post) }}">
                                    <button class="w3-btn w3-blue-grey w3-small w3-right w3-padding-small">
                                        <i class="fa fa-pencil-square-o"></i>
                                    </button>
                                </form>
                            @endcan
                        {{-- /owner actions --}}
                        </div>

                        {{-- This div holds the Post title and owner name --}}
                        <div class="w3-rest w3-row-padding">
                            <div class="w3-col m8">
                                <a href="posts/{{$post->id}}" class="w3-large">
                                    {{ $post->title}}
                                </a>
                            </div>
                            <div class="w3-col m4">
                                <div class="w3-medium">
                                    by @if ($post->ownerExists())
                                        {{$post->owner->name}}
                                    @else
                                        Deleted User
                                    @endif
                                </div>
                            </div>
                        {{-- /Post title and owner name --}}
                        </div>
                    {{-- /Post header --}}
                    </div>

                    <!-- Post Body -->
                    <div class="w3-container w3-white">
                        {!! html_entity_decode($post->body) !!}
                    {{-- /Post Body --}}
                    </div>

                    {{-- Post Footer --}}
                    <div  class=" w3-container w3-row w3-border-top">
                        <div class="w3-right w3-right-align w3-col m6">
                            Posted: {{$post->post_time}}
                        </div>
                        <div class="w3-rest"></div>
                    {{-- /Post Footer --}}
                    </div>
                {{-- /Post Card --}}
                </div>
                </div>
            @endforeach
        @endif

    {{-- /Holds the Post cards --}}
    </div>
@endsection

@section('footer')
    {{$posts->links()}}
@endsection