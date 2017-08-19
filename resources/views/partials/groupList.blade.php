@foreach($groups as $group)
    <a href="/g/{!!$group->stub!!}">
        <div class="info-box">
            <span class="info-box-icon bg-red">
                @if ($group->image_id != null)
                    <img src="{{url(asset($group->image->path))}}" alt="{!!$group->name!!}">
                @else
                    <img src="{{url(asset(App\Image::whereName('groupNoImage.svg')->first()->path))}}" alt="{!! $group->name !!}">
                @endif
            </span>
            <div class="info-box-content">
                <span class="info-box-text">{!!$group->name!!}</span>
                <span class="progress-description">{!!$group->about!!}</span>
            </div><!-- /.info-box-content -->
        </Div></a>
@endforeach