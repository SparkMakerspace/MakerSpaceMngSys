@extends('layouts.app')

@section('title')
    <h1>Posts</h1>
    @can('create',\App\Post::class)
        <form action="{{ URL::route('posts.create') }}">
            <div class="input-group">
                <button class="btn btn-primary">
                    New
                </button>
            </div>
        </form>
    @endcan
@endsection

@section('content')
    {{-- Posts List --}}
    <div class="list-group">
        @if($posts->isEmpty())
            <div class="list-group-item row">
                <h4>Looks like there aren't any posts quite yet...</h4>
            </div>
        @else
            @foreach ($posts as $post)
                <div class="list-group-item row">
                    <div class="row">
                        <!-- Post Title and Author -->
                        <div class="col-md-8 col-sm-8 col-xs-8">
                            <h4  class="list-group-item-heading">
                                <a href="posts/{{$post->id}}">
                                    {{ $post->title}}
                                </a>
                                <small>
                                    by @if ($post->userExists())
                                        {{$post->user->name}}
                                    @else
                                        Deleted User
                                    @endif
                                </small>
                            </h4>
                        </div>

                        <!-- Post Owner Actions -->
                        <div class="col-md-4 col-sm-4 col-xs-4 row">
                            @can('delete',$post)
                                <div class="col-sm-4 col-md-4 pull-right">
                                    <form action="{{ URL::route('posts.destroy',$post) }}" method="POST">
                                        <div class="input-group pull-right">
                                            <input type="hidden" name="_method" value="DELETE">
                                            <input type="hidden" name="_token" value="{{ csrf_token() }}">
                                            <button class="btn-link">
                                                Delete
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            @endcan
                            @can('update',$post)
                                <div class="col-sm-4 col-md-4 pull-right">
                                    <form action="{{ URL::route('posts.edit',$post) }}">
                                        <div class="input-group pull-right">
                                            <button class="btn-link">
                                                Edit
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            @endcan
                        </div>
                    </div>

                    <!-- Post Body -->
                    <div class="list-group-item-text">
                        {!! html_entity_decode($post->body) !!}
                        <br>
                        <div  class="small">
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