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
    <link href="/css/app.css" rel="stylesheet">
    <link href="/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <!-- Scripts -->
    <script>
        window.Laravel = <?php echo json_encode([
            'csrfToken' => csrf_token(),
        ]); ?>
    </script>
</head>
<body class="w3-vivid-orange">

@include('layouts.topnav')
<!-- Page Container -->
<div>
    <!-- Content -->
    <div id="main">
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
