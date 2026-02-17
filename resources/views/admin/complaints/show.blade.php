@extends('admin.layouts.main')
@section('title','Pengaduan | Pengaduan Masyarakat')
@section('css')
<link href="{{asset('assets/libs/datatables.net-bs4/css/dataTables.bootstrap4.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('assets/libs/datatables.net-buttons-bs4/css/buttons.bootstrap4.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('assets/libs/datatables.net-responsive-bs4/css/responsive.bootstrap4.min.css')}}" rel="stylesheet" type="text/css" />
<link href="{{asset('assets/libs/sweetalert2/sweetalert2.min.css')}}" rel="stylesheet" type="text/css" />
@endsection
@section('content')
<div class="page-content">
    <div class="container-fluid">
        
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
        
        <br>
        @if ($message = Session::get('success'))
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="mdi mdi-check-all me-2"></i>
            {{$message}}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
        @endif
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
                                                        <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">{{date('d F Y ',strtotime($complaint->created_at))}}</a>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Status</td>
                                                    <td>
                                                        @if ($complaint->status == '0')
                                                            <span class="badge rounded-pill bg-danger">Belum DiProses</span>
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
                                                        @if (empty($response->response))
                                                            <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">Not response yet</a>
                                                        @else
                                                            <a href="javascript::void(0)" id="inline-username" data-type="text" data-pk="1" data-title="Enter username">{{$response->response}}</a>
                                                        @endif
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td></td>
                                                    <td>
                                                        <a href="{{url('admin/complaints/show',$complaint->id)}}" class="btn btn-info">Berikan Balasan</a>
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
        
    </div>
</div>
@endsection
@push('script')
<script src="{{asset('assets/libs/datatables.net/js/jquery.dataTables.min.js')}}"></script>
<script src="{{asset('assets/libs/datatables.net-bs4/js/dataTables.bootstrap4.min.js')}}"></script>
<script src="{{asset('assets/libs/datatables.net-responsive/js/dataTables.responsive.min.js')}}"></script>
<script src="{{asset('assets/libs/datatables.net-responsive-bs4/js/responsive.bootstrap4.min.js')}}"></script>
<script src="{{asset('assets/js/pages/datatables.init.js')}}"></script>  
<script src="{{asset('assets/libs/sweetalert2/sweetalert2.min.js')}}"></script> 
<script>
    $('.btn-delete').click(function(){
        var society_id = $(this).attr('society-id');
        const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success mt-2',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: !0,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        confirmButtonClass:"btn btn-success mt-2",
        cancelButtonClass:"btn btn-danger ms-2 mt-2",
        buttonsStyling:!1}).then((result) => {
        if (result.isConfirmed) {
            window.location = "{{url('admin/society/delete')}}/"+society_id+"";
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
            )
        }
        })
    });
    $(document).ready(function() {
        $(document).on('click', '#set_dtl', function() {
            var username = $(this).data('username');
            var name = $(this).data('name');
            var email = $(this).data('email');
            var privilege = $(this).data('privilege');
            var outlet = $(this).data('outlet');
            var status = $(this).data('status');
            var photo = $(this).data('photo');
            var created = $(this).data('created');
            var updated = $(this).data('updated');
            $('#username').text(username);
            $('#name').text(name);
            $('#email').text(email);
            $('#privilege').text(privilege);
            $('#outlet').text(outlet);
            $('#created').text(created);
            $('#updated').text(updated);
            $('#img-data').attr('src', "{{asset('avatar/')}}/"+photo);

        })
    })
</script>
@endpush