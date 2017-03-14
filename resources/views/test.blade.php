@extends('scaffold-interface.layouts.app')

@php($url = config('richfilemanager.url'))

@section('content')


    <?php
    $output = shell_exec("..\\slic3r\\slic3r.exe C:\\Users\\Me\\Desktop\\3dtest\\test.stl -load .\\config.ini");
    $output = shell_exec("..\\slic3r\\slic3r-console.exe ..\\storage\\app\\3dPrintFiles\\test.stl");
    echo "<pre>$output</pre>";
    ?>




@endsection