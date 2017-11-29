

<h1>Please wait while preview is generated</h1>

    <textarea id="gcode">
        {{$MyGcode}}
    </textarea>

    <html>
    <head>

        <link rel="stylesheet" href="../../../../Liquid-gcode-renderer/assets/stylesheets/application.css" />

        <title>Liquid: Gcode Renderer</title>

    </head>
    <body>

    <div id="overlay"></div>
    <div id="interface">
        Analyzing Path <span id="readpathcur">0</span> / <span id="readpathtot">?</span><br />
        Rendering Path <span id="rendpathcur">0</span> / <span id="rendpathtot">?</span><br />
        Extruder temp. <span id="tempextrude">?</span>C<br />
        Bed temp. <span id="tempheatbed">?</span>C<br />
        Layer <span id="fltlayermin">?</span> - <span id="fltlayermax">?</span>
    </div>
    <div id="scene"></div>

    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/assets/vendor/jquery.min.js"></script>
    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/assets/vendor/three.min.js"></script>
    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/assets/vendor/three-orbitcontrols.js"></script>
    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/assets/javascripts/event.js"></script>
    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/assets/javascripts/user.js"></script>
    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/assets/javascripts/gclib.js"></script>
    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/assets/javascripts/gcview.js"></script>
    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/assets/javascripts/gcparse.js"></script>

    <script type="text/javascript" src="../../../../Liquid-gcode-renderer/printers/ultimaker2.js"></script>

    <script type="text/javascript">


        var printer = printerultimaker2;
        var model = window.location.hash.substr(1);

        $('#overlay')
            .text('Loading model: '+model)
            .css('line-height', window.innerHeight+'px');

       var payload = document.getElementById("gcode").value;
            $('#overlay').hide();
            $('#interface').show();
            gcview._init();

            gcparse._parse(payload);


    </script>

    </body>
    </html>



<div>Name: {!!$auto3dprintqueue->Name!!}</div>
<div>Infill: {!!$auto3dprintqueue->Infill!!}</div>div>
<div>Status: {!!$auto3dprintqueue->Status!!}</div>
<div>Notified: {!!$auto3dprintqueue->Notified!!}</div>

<div>material: {!!$auto3dprintqueue->auto3dprintmaterial->material!!} </div>
<div>name: {!!$auto3dprintqueue->user->name!!}</div>

