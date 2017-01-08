
@section('css')
    <link href="{!! asset('/css/summernote.css') !!}" rel="stylesheet">
@endsection
@section('scripts')
    <script src="{!!asset('/js/summernote.min.js')!!}"></script>
    <script type="text/javascript">
        var breakButton = function (context) {
            var ui = $.summernote.ui;
            var p = document.createElement('p');

            // create button
            var button = ui.button({
                contents: '<i class="fa fa-paper-plane"/> Insert Break',
                tooltip: 'Insert Break',
                click: function () {
                    var ele = $('#wysiwyg');
                    ele.summernote('insertNode',p);
                    ele.summernote('insertText','==BREAK==');
                }
            });

            return button.render();   // return button as jquery object
        };

        $(document).ready(function() {
        });
        $('#wysiwyg').summernote({
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'italic', 'underline', 'clear']],
                ['fontname', ['fontname']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['height', ['height']],
                ['table', ['table']],
                ['insert', ['link', 'picture', 'hr','Hello']],
                ['view', ['fullscreen', 'codeview']],
                ['help', ['help']]
            ],
            buttons: {
                Hello: breakButton
            },
            minHeight: 300
        });
    </script>
@endsection