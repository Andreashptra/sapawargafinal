@extends('frontend.layouts.main')
@section('title','Detail Pengaduan')
@section('content')
<div class="page-content">
    <div class="container-fluid">

        <!-- start page title -->
        <div class="row">
            <div class="col-12">
                <div class="page-title-box d-sm-flex align-items-center justify-content-between">
                    <h4 class="mb-sm-0 font-size-18">Detail Pengaduan</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item active">Detail Pengaduan</li>
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
                    Contoh
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                @endif
            </div>
        </div>
        <br>
        <div class="row">
            <form action="#" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="col-12">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-body">
                                    <h4 class="card-title">Detail Pengaduan</h4>
                                        
        
                                        <div class="table-responsive">
                                            <table class="table table-striped table-nowrap mb-0">
                                                <br>
                                                <tbody>
                                                <tr>
                                                    <td>Nama</td>
                                                    <td>
                                                        <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">{{$complaint->Society->name}}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>NIK</td>
                                                    <td>
                                                        <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">{{$complaint->nik}}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Nomor Telepon</td>
                                                    <td>
                                                        <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">{{$complaint->Society->phone_number}}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Tanggal</td>
                                                    <td>
                                                        <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">{{date('d F Y H:i:s',strtotime($complaint->created_at))}}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        @if ($complaint->status == '0')
                                                            <span class="badge rounded-pill bg-danger">Belum Diproses</span>
                                                        @elseif($complaint->status == "process")
                                                            <span class="badge rounded-pill bg-primary">Proses</span>
                                                        @else
                                                            <span class="badge rounded-pill bg-success">Selesai</span>
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Foto</td>
                                                    <td>
                                                        <img src="{{url('avatar_complaint/',$complaint->photo)}}" width="500px">
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Isi Pengaduan</td>
                                                    <td>
                                                        <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">{{$complaint->contents_of_the_report}}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Respon</td>
                                                    <td>
                                                        <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">{{$complaint->Response->response}}</a>
                                                    </td>
                                                </tr>
                                               
                                                
            
                                                </tbody>
                                            </table>
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