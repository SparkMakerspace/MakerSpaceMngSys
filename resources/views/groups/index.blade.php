@extends('layouts.app')

@section('title')
    <h1>Groups</h1>
@endsection

@section('content')
    <div class="w3-row w3-content">
    @foreach(\App\Group::getGroups() as $group)
        <div class="w3-display-container w3-center w3-quarter w3-section w3-padding">
            <div class="w3-theme-l4 w3-btn w3-padding-0" style="width: 100%;">
            <img src="uploads/test.jpg" style="width: 100%;">
            <div class="w3-display-bottommiddle w3-center w3-padding w3-theme-d1 w3-card-8 w3-round-medium w3-hide-medium">
                {{$group->name}}
            </div>
            <div class="w3-display-bottommiddle w3-center w3-padding-tiny w3-theme-d1 w3-card-8 w3-round-medium w3-small w3-hide-small w3-hide-large">
                {{$group->name}}
            </div>
            </div>
        </div>
    @endforeach
    </div>
@endsection