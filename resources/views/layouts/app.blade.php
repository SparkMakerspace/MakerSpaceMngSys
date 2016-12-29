<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Styles -->
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="/css/app.css" rel="stylesheet">
    <link href="/css/all.css" rel="stylesheet">

    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body class="spark-orange">

@include('layouts.topnav')
<!-- Page Container -->
<div>
    <!-- Content -->
    <div id="main" class="w3-container w3-card-12 w3-white" style="min-height: 700px; min-width: 95%; max-width: 800px; margin:auto;">
        <div class="w3-margin-right w3-margin-left">
            @yield('title')
        </div>
        @yield('content')
        @yield('footer')
    </div>
</div>

<!-- Scripts -->
<script src="/js/app.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
<script>
    jQuery(document).ready(function() {
        $('.focus').focus();
        @yield('postJquery');
    });
</script>
</body>
</html>
