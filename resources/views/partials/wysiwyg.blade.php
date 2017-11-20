<script src="{{url('/js/tinymce/tinymce.min.js')}}"></script>
@php
if(!isset($post)){
    $post = false;
};
if(!isset($value)){
    $value = '';
}
if(!isset($attributes)){
    $attributes = [];
}
@endphp
<script>
    tinymce.init({
        selector: '#{!!$name!!}',
        height: 500,
        @if($post)
        menubar: false,
        plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table contextmenu paste code'
        ],

        toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | break',
        @else
        theme: 'modern',
        plugins: [
            'advlist autolink lists link image charmap preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu directionality',
            'paste textcolor colorpicker textpattern imagetools codesample toc'
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
        toolbar2: 'preview media | forecolor backcolor | codesample',
        image_advtab: true,
        @endif
        content_css: '//www.tinymce.com/css/codepen.min.css',
        @if($post)
        setup: function (editor) {
            editor.addButton('break', {
                text: 'Insert Break',
                icon: false,
                onclick: function () {
                    editor.insertContent('!!BREAK!!');
                }
            });
        },
        @endif
        file_browser_callback : function(field_name, url, type, win) {

            // from http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
            var w = window,
                d = document,
                e = d.documentElement,
                g = d.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth,
                y = w.innerHeight|| e.clientHeight|| g.clientHeight;

            var cmsURL = '{!! url('RichFilemanager/index.html')!!}?&field_name='+field_name;

            if(type == 'image') {
                cmsURL = cmsURL + "&type=images";
            }

            tinyMCE.activeEditor.windowManager.open({
                file : cmsURL,
                title : 'Filemanager',
                width : x * 0.8,
                height : y * 0.8,
                resizable : "yes",
                close_previous : "no"
            });

        }
    })
</script>

<div class="input-group" style="width: 100%;">

        {{ Form::text(
            $name,
            $value,
            array_merge(
                $attributes,
                ['id' => $name, 'class'=>'form-control']
                )
        ) }}
</div>