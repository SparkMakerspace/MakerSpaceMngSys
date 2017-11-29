@extends('scaffold-interface.layouts.app')
@section('title','Show')
@section('content')

<section class="content">
    <h1>
        Show door
    </h1>
    <br>
    <form method = 'get' action = '{!!url("door")!!}'>
        <button class = 'btn btn-primary'>door Index</button>
    </form>
    <br>
    <table class = 'table table-bordered'>
        <thead>
            <th>Key</th>
            <th>Value</th>
        </thead>
        <tbody>
        <tr>
            <td>
                <b><i>name : </i></b>
            </td>
            <td>{!!$door->name!!}</td>
        </tr>
            <tr>
                <td>
                    <b><i>sundayOpen : </i></b>
                </td>
                <td>{!!$door->sundayOpen!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>sundayClose : </i></b>
                </td>
                <td>{!!$door->sundayClose!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>mondayOpen : </i></b>
                </td>
                <td>{!!$door->mondayOpen!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>mondayClose : </i></b>
                </td>
                <td>{!!$door->mondayClose!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>tuesdayOpen : </i></b>
                </td>
                <td>{!!$door->tuesdayOpen!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>tuesdayClose : </i></b>
                </td>
                <td>{!!$door->tuesdayClose!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>wednesdayOpen : </i></b>
                </td>
                <td>{!!$door->wednesdayOpen!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>wednesdayClose : </i></b>
                </td>
                <td>{!!$door->wednesdayClose!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>thursdayOpen : </i></b>
                </td>
                <td>{!!$door->thursdayOpen!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>thursdayClose : </i></b>
                </td>
                <td>{!!$door->thursdayClose!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>fridayOpen : </i></b>
                </td>
                <td>{!!$door->fridayOpen!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>fridayClose : </i></b>
                </td>
                <td>{!!$door->fridayClose!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>saturdayOpen : </i></b>
                </td>
                <td>{!!$door->saturdayOpen!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>saturdayClose : </i></b>
                </td>
                <td>{!!$door->saturdayClose!!}</td>
            </tr>
            <tr>
                <td>
                    <b><i>unlocked : </i></b>
                </td>
                <td>{!!$door->unlocked!!}</td>
            </tr>
        </tbody>
    </table>
</section>
@endsection