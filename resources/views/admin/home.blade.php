@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2 text-center">
                <h1>Good day, {{Auth::user()->name}}</h1>
                <ul class="list-group">
                    <li class="list-group-item">
                        <a href="/admin/users">
                            <h4 class="list-group-item-heading">
                            User Manager
                                </h4>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
@endsection