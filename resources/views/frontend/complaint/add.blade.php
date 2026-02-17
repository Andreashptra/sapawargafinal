@extends('frontend.layouts.main')
@section('title','Add Complaint')
@section('content')
<div class="page-content">
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Buat Pengaduan</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item active">Buat Pengaduan</li>
                        </ol>
                    </div>

                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                @if ($errors->any())
                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                    <ul>
                        @foreach ($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                @endif
                @if ($message = Session::get('success'))
                <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <i class="mdi mdi-check-all me-2"></i>
                    {{$message}}
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                @endif
            </div>
        </div>
        <br>
        <div class="row">
            <form action="{{url('user/complaint/save')}}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="col-12">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="mb-3 row">
                                        <label for="contents_of_the_report" class="col-md-2 col-form-label">Isi Pengaduan</label>
                                        <div class="col-md-10">
                                            <textarea class="form-control" rows="8" cols="50" name="contents_of_the_report" id="contents_of_the_report"></textarea>
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="photo" class="col-md-2 col-form-label">Foto</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="file" id="photo" name="photo">
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="photo" class="col-md-2 col-form-label"></label>
                                        <div class="col-md-10">
                                            <button type="submit" class="btn btn-success">Submit</button>
                                    </div>
                                    
                                    
                                    
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div> <!-- container-fluid -->
</div>
@endsection