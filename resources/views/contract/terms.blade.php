@extends('scaffold-interface.layouts.app')

@section('content')
    <section class="content">
        <div class="box box-primary">
            <div class="box-header">
                <h2>Spark Makerspace Member Contract Revision {{$contract->revision}}</h2>
                <small>Dated: {{$contract->updated_at}}</small>
            </div>
            <div class="box-body">
                <div>
                    {!! nl2br($contract->text) !!}
                </div>
                <hr>
                <div><p>Accepting the above contract is required to become a member of Spark Makerspace. You may accept
                        this contract by electronic signature on this page or by pen-and-ink signature in person at
                        Spark Makerspace.</p>
                    <p>By entering your name and clicking accept, you are accepting the above terms via electronic
                        signature in accordance with Section 2 of the UETA and Section 106 of the ESIGN Act. You are
                        encouraged to keep a record of this agreement as signed, but you will be able to view the most
                        current revision of the member contract at any time.</p>
                    <div>
                        @if(session('status'))
                            <div class="alert alert-danger">
                                {{session('status')}}
                            </div>
                        @endif
                        {!! Form::open(['url'=>'terms','method'=>'post'])  !!}
                        @if($signed && Auth::user()->contract_id == $contract->id)
                                <div class="alert alert-success">
                                    You've already signed the member contract
                                </div>
                            <div class="form-group">
                                {!! Form::label('Signature','Signature:') !!}
                                {!! Form::input('Signature','Signature',Auth::user()->signature,['class'=>'form-control','disabled']) !!}
                                <div class="row">
                                    <div class="col-md-offset-1 col-md-4">
                                        <h4>{!! Auth::user()->name !!}</h4>
                                    </div>
                                </div>
                            </div>
                            {!! Form::submit('I Have Read and Accept the Above Contract',['disabled','class'=>'btn btn-disabled','id'=>'submit']) !!}
                            {!! Form::close() !!}
                        @else
                            {!! Form::label('Signature','Signature:') !!}
                            {!! Form::input('Signature','Signature',null,['class'=>'form-control']) !!}
                            <div class="row">
                                <div class="col-md-offset-1 col-md-4">
                                    <h4>{!! Auth::user()->name !!}</h4>
                                </div>
                            </div>
                            {!! Form::submit('I Have Read and Accept the Above Contract',['class'=>'btn btn-default','id'=>'submit','disabled']) !!}
                            {!! Form::close() !!}
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </section>

@endsection

@push('script')
    <script>
        $(function(){
            $('input').keyup(function(){
                if($(this).val() === '{!! Auth::user()->name !!}'){
                    $('input#submit').prop('disabled',false);
                } else {
                    $('input#submit').prop('disabled',true);
                }
            });
        })
    </script>
@endpush