<table class="table table-responsive" id="posts-table">
    <thead>
        <th>Image Id</th>
        <th>Title</th>
        <th>Stub</th>
        <th>Owner Name</th>
        <th>Posted</th>
        <th>Last Modified</th>
        <th colspan="3">Action</th>
    </thead>
    <tbody>
    @foreach($posts as $post)
        <tr>
            <td>{!! $post->image_id !!}</td>
            <td>{!! $post->title !!}</td>
            <td>{!! $post->stub !!}</td>
            <td>{!! App\Models\User::whereId($post->owner_id)->first()->name !!}</td>
            <td>{!! $post->created_at !!}</td>
            <td>{!! $post->updated_at !!}</td>
            <td>
                {!! Form::open(['route' => ['posts.destroy', $post->id], 'method' => 'delete']) !!}
                <div class='btn-group'>
                    <a href="{!! route('posts.show', [$post->id]) !!}" class='btn btn-default btn-xs'><i class="glyphicon glyphicon-eye-open"></i></a>
                    <a href="{!! route('posts.edit', [$post->id]) !!}" class='btn btn-default btn-xs'><i class="glyphicon glyphicon-edit"></i></a>
                    {!! Form::button('<i class="glyphicon glyphicon-trash"></i>', ['type' => 'submit', 'class' => 'btn btn-danger btn-xs', 'onclick' => "return confirm('Are you sure?')"]) !!}
                </div>
                {!! Form::close() !!}
            </td>
        </tr>
    @endforeach
    </tbody>
</table>