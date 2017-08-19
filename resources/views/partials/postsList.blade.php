<div class="box">
    @if(Auth::user())

        <div class="box-header with-border">
            <h3 class="box-title">
                Posts
            </h3>
        </div>
        <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
            Create A New Post
        </button>

        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
            <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content">

                    <div class="modal-body">
                        @include('post.editClean')
                    </div>

                </div>
            </div>
        </div>
    @endif


    <div class="box-body">
        <ul class="products-list">
            @foreach($posts as $post)
                <li class="list-group-item">
                    @if($post->image()->first())
                        <div class="product-img">
                            <img src="{{url($post->image()->first()->path)}}">
                        </div>
                    @endif
                    <span class="pull-right">
                            {{$post->getOwner()->name}}
                        <br>
                        {!!$post->posted_at!!}
                        @if(Auth::user())
                            <br>
                            <a data-toggle="modal" data-target="#myModal" class='delete btn btn-danger btn-xs'
                               data-link="/post/{!!$post->id!!}/deleteMsg">
                                <iclass='material-icons'>delete</i>
                            </a>
                            <a href='#' class='viewEdit btn btn-primary btn-xs'
                               data-link='/post/{!!$post->id!!}/edit'>
                                <i class='material-icons'>edit</i>
                            </a>
                            <a href='#' class='viewShow btn btn-warning btn-xs' data-link='/post/{!!$post->id!!}'>
                                <i class='material-icons'>info</i>
                            </a>
                        @endif
                            </span>
                    <div class="product-info" style="margin-left: 0px">
                        <h3>{{$post->title}}</h3>
                    </div>
                    <div>
                        {!! $post->getExcerpt()!!}
                    </div>
                </li>
            @endforeach
        </ul>
        {!! $posts->links() !!}
    </div>


</div>
