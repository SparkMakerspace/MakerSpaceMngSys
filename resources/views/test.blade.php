@extends('scaffold-interface.layouts.app')

@php($url = config('richfilemanager.url'))

@section('content')
    <script src="{{url('/js/tinymce/tinymce.min.js')}}"></script>
    <textarea id="editor"></textarea>
    <script>
        tinymce.init({
            selector: '#editor',
            height: 500,
            menubar: false,
            plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste code'
            ],
            toolbar: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | break',
            content_css: '//www.tinymce.com/css/codepen.min.css',
            setup: function (editor) {
                editor.addButton('break', {
                    text: 'Insert Break',
                    icon: false,
                    onclick: function () {
                        editor.insertContent('!!BREAK!!');
                    }
                });
            },
            file_browser_callback : function(field_name, url, type, win) {

                // from http://andylangton.co.uk/blog/development/get-viewport-size-width-and-height-javascript
                var w = window,
                    d = document,
                    e = d.documentElement,
                    g = d.getElementsByTagName('body')[0],
                    x = w.innerWidth || e.clientWidth || g.clientWidth,
                    y = w.innerHeight|| e.clientHeight|| g.clientHeight;

                var cmsURL = '../RichFilemanager/index.html?&field_name='+field_name;

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
@endsection