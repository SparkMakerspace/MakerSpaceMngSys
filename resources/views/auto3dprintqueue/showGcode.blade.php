@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<!DOCTYPE html >
<html>
<head>
    <meta http-equiv="X-UA-Compatible" content="chrome=1"/>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8"/>
    <title>g-code simulator</title>
    <script src="../../../../webgcode/webapp/libs/require.js"></script>
    <script src="../../../../webgcode/webapp/config.js"></script>
    <script>
        requirejs.config({
            baseUrl: '../../../../webgcode/webapp'
        });
    </script>

    <link rel="shortcut icon" href="../../../../webgcode/webapp/images/icon_fraise_48.png"/>
    <link rel="stylesheet" href="../../../../webgcode/webapp/twoDView.css" type="text/css">
    <link rel="stylesheet" href="../../../../webgcode/webapp/threeDView.css" type="text/css">
    <style>

        body, html {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            position: absolute;
            height: 100%;
            width: 100%;
            margin: 0;
        }

        body {
            padding-left: 8px;
            padding-right: 8px;
        }

        h1 {
            margin-top: 0;
        }

        .editBlock {
            position: relative;
            float: left;
            width: 39%;
            height: 90%;
            padding: 1px;
            margin: 0;
        }

        .editBlock pre {
            width: 100%;
            height: 500px;
            margin: 0;
        }

        .viewContainer {
            float: right;
            width: 60%;
        }

        #loader {
            display: inline-block;
            background-size: 100% 100%;
            background-image: url(../../../../webgcode/webapp/images/spinner.svg);
            width: 20px;
            height: 20px;
        }

        .boundsTable {
            border-collapse: collapse;
        }

        .boundsTable td {
            border: dashed gray 1px;
            padding: 3px;
        }

        .ThreeDView {
            border: solid gray 1px;
            background: #000;
            height: 400px;
            position: relative;
        }

        .TwoDView {
            border: solid gray 1px;
            background: #000;
            height: 400px;
        }

        #app {
            position: relative;
        }
    </style>
</head>


<script id="demoCode" type="application/gcode">
{{$MyGcode}}
</script>
<div id="app"></div>
<script>
    require(['Ember', 'cnc/ui/graphicView', 'cnc/cam/cam', 'cnc/util', 'cnc/ui/gcodeEditor', 'cnc/gcode/gcodeSimulation', 'templates'],
        function (Ember, GraphicView, cam, util, gcodeEditor, gcodeSimulation) {
            var demoCode = $('#demoCode').text();

            Ember.Handlebars.helper('num', function (value) {
                return new Handlebars.SafeString(Handlebars.Utils.escapeExpression(util.formatCoord(value)));
            });
            Ember.TEMPLATES['application'] = Ember.TEMPLATES['camApp'];

            window.Simulator = Ember.Application.create({
                rootElement: '#app'
            });

            Simulator.GcodeEditorComponent = gcodeEditor.GcodeEditorComponent;
            Simulator.GraphicView = GraphicView;

            Simulator.ApplicationController = Ember.ObjectController.extend({
                init: function () {
                    this._super();
                    var _this = this;
                    $(window).on('dragover', function (event) {
                        event.preventDefault();
                        event.dataTransfer.dropEffect = 'move';
                    });

                    $(window).on('drop', function (evt) {
                        evt.preventDefault();
                        evt.stopPropagation();
                        var files = evt.dataTransfer.files;
                        var file = files[0];
                        var reader = new FileReader();
                        reader.onload = function (e) {
                            _this.set('code', e.target.result);
                            _this.launchSimulation();
                        };
                        reader.readAsText(file);
                    });
                    this.launchSimulation();
                },
                    actions: {
                        simulate: function () {
                            this.launchSimulation();
                        },
                        loadBigSample: function () {
                            this.set('computing', true);
                            var _this = this;
                            require(['text!samples/aztec_calendar.ngc'], function (text) {
                                _this.set('code', text);
                                _this.launchSimulation();
                            });
                        }
                    },
                launchSimulation: function () {
                    var _this = this;

                    function handleResult(result) {
                        _this.flushFragmentFile();
                        var errors = [];
                        for (var i = 0; i < result.errors.length; i++) {
                            var error = result.errors[i];
                            errors.push({row: error.lineNo, text: error.message, type: "error"});
                        }
                        _this.set('errors', errors);
                        _this.set('bbox', {min: result.min, max: result.max});
                        _this.set('totalTime', result.totalTime);
                        _this.set('lineSegmentMap', result.lineSegmentMap);
                        _this.set('computing', false);
                        console.timeEnd('simulation');
                    }

                    console.time('simulation');
                    this.set('computing', true);
                    _this.set('lineSegmentMap', []);
                    this.get('simulatedPath').clear();
                    gcodeSimulation.parseInWorker(this.get('code'), new util.Point(0, 0, 0),
                        Ember.run.bind(_this, handleResult),
                        Ember.run.bind(_this, function (fragment) {
                            _this.get('fragmentFile').pushObject(fragment);
                            Ember.run.throttle(_this, _this.flushFragmentFile, 500);
                        }));
                },
                flushFragmentFile: function () {
                    this.get('simulatedPath').pushObjects(this.get('fragmentFile'));
                    this.get('fragmentFile').clear();
                },
                formattedTotalTime: function () {
                    var totalTime = this.get('totalTime');
                    var humanized = util.humanizeDuration(totalTime);
                    return {humanized: humanized, detailed: Math.round(totalTime) + 's'};
                }.property('totalTime'),
                currentHighLight: function () {
                    return this.get('lineSegmentMap')[this.get('currentRow')];
                }.property('currentRow', 'lineSegmentMap').readOnly(),
                code: demoCode,
                errors: [],
                bbox: {},
                totalTime: 0,
                lineSegmentMap: [],
                currentRow: null,
                simulatedPath: [],
                computing: false,
                fragmentFile: [],
                canSelectLanguage: false,
                usingGcode: true,
                decorations: []
            });
        });
</script>
<div>Name: {!!$auto3dprintqueue->Name!!}</div>
<div>Infill: {!!$auto3dprintqueue->Infill!!}</div>div>
<div>Status: {!!$auto3dprintqueue->Status!!}</div>
<div>Notified: {!!$auto3dprintqueue->Notified!!}</div>
<div>color: {!!$auto3dprintqueue->auto3dprintercolor->color!!}</div>
<div>material: {!!$auto3dprintqueue->auto3dprintmaterial->material!!} </div>
<div>name: {!!$auto3dprintqueue->user->name!!}</div>

@endsection('content')