@extends('scaffold-interface.layouts.app')

@section('content')
    <script src="//cdn.ckeditor.com/4.5.3/standard/ckeditor.js"></script>
    <textarea name="editor"></textarea>
    <script>
        CKEDITOR.replace( 'editor', {
            filebrowserBrowseUrl: '{!! url('filemanager/index.html') !!}'
        });
    </script>
    </body>
@endsection