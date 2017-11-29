<script type="text/javascript">
    // File Picker modification for FCK Editor v2.0 - www.fckeditor.net
    // by: Pete Forde <pete@unspace.ca> @ Unspace Interactive
    var urlobj;
    var cWindow;

    function BrowseServer(obj)
    {
        urlobj = obj;
        OpenServerBrowser(
            '{!! url('RichFilemanager') !!}',
            screen.width * 0.7,
            screen.height * 0.7 ) ;
    }

    function OpenServerBrowser( url, width, height )
    {
        var iLeft = (screen.width - width) / 2 ;
        var iTop = (screen.height - height) / 2 ;
        var sOptions = "toolbar=no,status=no,resizable=yes,dependent=yes" ;
        sOptions += ",width=" + width ;
        sOptions += ",height=" + height ;
        sOptions += ",left=" + iLeft ;
        sOptions += ",top=" + iTop ;
        oWindow = window.open( url, "BrowseWindow", sOptions ) ;
    }

    function SetUrl( url, width, height, alt )
    {
        document.getElementById(urlobj).value = url ;
        oWindow.close();
    }
</script>
<div class="input-group">
    <div class="input-group-btn">
        {{ Form::button($buttonLabel,
        [
        'onclick'=>"BrowseServer('$name');",
        'class'=>'btn'
        ]) }}
    </div>
        {{ Form::text(
            $name,
            $value,
            array_merge(
                $attributes,
                ['id' => $name, 'class'=>'form-control']
                )
        ) }}
</div>