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
    {{-- Posts List --}}
    <div class="w3-row-padding">
        @if($posts->isEmpty())
            <div class="w3-card-2 w3-red w3-hover-dark-gray w3-margin-top w3-animate-right w3-container">
                <h4>Looks like there aren't any posts quite yet...</h4>
            </div>
        @else
            @foreach ($posts as $post)
                <div class="w3-card-2 w3-light-gray w3-margin-top w3-half">
                    <div class="w3-container w3-border-bottom w3-row">

                        <div class="w3-col m1 w3-right w3-row">

                            <!-- Post Owner Actions -->
                            @can('delete',$post)
                                <div class="w3-col m6 w3-right w3-right-align">
                                    <form action="{{ URL::route('posts.destroy',$post) }}" method="POST">
                                        <div class="">
                                            <input type="hidden" name="_method" value="DELETE">
                                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                            <button class="w3-btn w3-red w3-small w3-padding-small">
                                                Delete
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            @endcan
                            @can('update',$post)
                                <div class="w3-col m6 w3-right w3-right-align">
                                    <form action="{{ URL::route('posts.edit',$post) }}">
                                        <div class="">
                                            <button class="w3-btn w3-blue-grey w3-small w3-padding-small">
                                                Edit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            @endcan
                        </div>
                        <div class="w3-rest w3-row">
                            <div class="w3-col m4 w3-right w3-right-align">
                                by @if ($post->ownerExists())
                                    {{$post->owner->name}}
                                @else
                                    Deleted User
                                @endif
                            </div>
                            <div class="w3-rest">
                                <a href="posts/{{$post->id}}">
                                    {{ $post->title}}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Post Body -->
                    <div class="w3-container w3-white">
                        {!! html_entity_decode($post->body) !!}
                    </div>
                    <div  class=" w3-container w3-row w3-border-top">
                        <div class="w3-rest"></div>
                        <div class="w3-right w3-right-align w3-col m4">
                            Posted: {{$post->post_time}}
                        </div>
                    </div>
                </div>
            @endforeach
        @endif
    </div>
@endsection

@section('footer')
    {{$posts->links()}}
@endsection