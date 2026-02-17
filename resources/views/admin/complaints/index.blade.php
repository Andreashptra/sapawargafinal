@extends('admin.layouts.main')
@section('title','Pengaduan | Public Pengaduan')
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
                    <h4 class="mb-sm-0 font-size-18">Pengaduan</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item active">Pengaduan</li>
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
            <div class="col-12">
                <div class="card">
                    <div class="card-body">

                        

                        <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>Foto</th>
                                <th>Nama</th>
                                <th>Tanggal Pengaduan</th>
                                <th>Status</th>
                                <th>Aksi</th>
                            </tr>
                            </thead>


                            <tbody>
                                @foreach ($complaints as $row)
                                <tr>
                                    <td>{{$loop->iteration}}</td>
                                    <td><img src="{{url('avatar_complaint/',$row->photo)}}" width="100px"></td>
                                    <td>{{$row->Society->name}}</td>
                                    <td>{{date('d F Y H:i:s',strtotime($row->created_at))}}</td>
                                    @if ($row->status == "0")
                                        <td><span class="badge rounded-pill bg-danger">Belum Diproses</span></td>
                                    @elseif($row->status == 'process')
                                        <td><span class="badge rounded-pill bg-primary">Proses</span></td>
                                    @else 
                                        <td><span class="badge rounded-pill bg-success">Selesai</span></td>
                                    @endif
                                    <td>
                                        <a href="{{url('admin/complaints/'.$row->id)}}" class="btn btn-danger btn-rounded waves-effect waves-light">
                                            <i class="bx bx-edit font-size-16 align-middle"></i>
                                        </a>
                                        <a href="javascript: void(0);" class="btn btn-warning btn-rounded waves-effect waves-light btn-delete" title="Delete Data" society-id="{{$row->id}}">
                                            <i class="bx bx-trash-alt font-size-16 align-middle"></i>
                                        </a>
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
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