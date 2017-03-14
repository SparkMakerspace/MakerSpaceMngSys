
        <!DOCTYPE html>


<script>

    var config = {
        lastImportedKey: 'last-imported',
        notFirstVisitKey: 'not-first-visit',
        defaultFilePath: './gcode.gcode'
        //defaultFilePath: './gcode.gcode'
    }
</script>



<head>
    <meta http-equiv="Access-Control-Allow-Origin" content="*">
    <meta charset="utf-8">
    <title>GCode Viewer</title>
    <link rel="stylesheet" href="../../../../gcode-viewer-master/web/lib/bootstrap.min.css">
    <style>
        #renderArea {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            top: 40px;
            background-color: #000000;
        }
        .dg.main {
            margin-top:40px;
        }
    </style>
    <!-- 3rd party libs -->
    <script src="../../../../gcode-viewer-master/web/lib/modernizr.custom.93389.js"></script>
    <script src="../../../../gcode-viewer-master/web/lib/jquery-1.7.1.min.js"></script>
    <script src="../../../../gcode-viewer-master/web/lib/bootstrap-modal.js"></script>
    <script src="../../../../gcode-viewer-master/web/lib/sugar-1.2.4.min.js"></script>
    <script src="../../../../gcode-viewer-master/web/lib/three.js"></script>
    <script src="../../../../gcode-viewer-master/web/lib/TrackballControls.js"></script>

    <script src="../../../../gcode-viewer-master/web/js/ShaderExtras.js"></script>
    <script src="../../../../gcode-viewer-master/web/js/postprocessing/EffectComposer.js"></script>
    <script src="../../../../gcode-viewer-master/web/js/postprocessing/MaskPass.js"></script>
    <script src="../../../../gcode-viewer-master/web/js/postprocessing/RenderPass.js"></script>
    <script src="../../../../gcode-viewer-master/web/js/postprocessing/ShaderPass.js"></script>
    <script src="../../../../gcode-viewer-master/web/js/postprocessing/BloomPass.js"></script>

    <script src="../../../../gcode-viewer-master/web/js/Stats.js"></script>
    <script src="../../../../gcode-viewer-master/web/js/DAT.GUI.min.js"></script>
    <!-- Custom code -->
    <script type="text/javascript" src="../../../../gcode-viewer-master/web/gcode_model.js"></script>
    <script type="text/javascript" src="../../../../gcode-viewer-master/web/gcode_parser.js"></script>
    <script type="text/javascript" src="../../../../gcode-viewer-master/web/gcode_interpreter.js"></script>
    <script type="text/javascript" src="../../../../gcode-viewer-master/web/gcode_importer.js"></script>
    <script type="text/javascript" src="../../../../gcode-viewer-master/web/gcode_renderer.js"></script>
    <script src="../../../../gcode-viewer-master/web/renderer.js"></script>
    <script src="../../../../gcode-viewer-master/web/ui.js"></script>

</head>
<body>

<!-- Top bar -->
<div class="navbar navbar-fixed-top">
    <div class="navbar-inner">
        <div class="container">
            <span class="brand" href="#">GCode Viewer</span>
            <ul class="nav">
                <li><a href="javascript:openDialog()">Load Model</a></li>
                <li><a href="javascript:about()">About</a></li>
            </ul>
            <ul class="nav pull-right">
                <li><a href="https://github.com/jherrm/gcode-viewer" target="_blank">Code on GitHub</a></li>
                <li><a href="http://twitter.com/jherrm" target="_blank">@jherrm</a></li>
            </ul>
        </div>
    </div>
</div>

<!-- WebGL rendering area -->
<div id="renderArea"></div>

<div class="modal" id="openModal" style="display: none">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">&times;</a>
        <h3>Open GCode</h3>
    </div>
    <div class="modal-body">
        <h4>Examples</h4>
        <ul class="gcode_examples">
            <li><a href="examples/15mm_cube.gcode">15mm_cube.gcode</a></li>
            <li><a href="examples/octocat.gcode">octocat.gcode</a></li>
            <li><a href="examples/part.gcode">part.gcode</a></li>
        </ul>
        <p>To view your own model, drag a gcode file from your desktop and drop it in this window.</p>
    </div>
    <div class="modal-footer">
        <a class="btn" data-dismiss="modal">Cancel</a>
    </div>
</div>

<!-- 'About' dialog'-->
<div class="modal fade" id="aboutModal" style="display: none">
    <div class="modal-header">
        <a class="close" data-dismiss="modal">&times;</a>
        <h3>About GCode Viewer</h3>
    </div>


</body>
