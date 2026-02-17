@extends('admin.layouts.main')
@section('title','Masyarakat | Public Complaints')
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
                    <h4 class="mb-sm-0 font-size-18">Masyarakat</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item active">Masyarakat</li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <a href="{{route('society.create')}}" class="btn btn-success waves-effect waves-light"> Tambah</a>
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
                                <th>NIK</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Telepon</th>
                                <th>Alamat</th>
                                <th>Aksi</th>
                            </tr>
                            </thead>


                            <tbody>
                                @foreach ($society as $row)
                                <tr>
                                    <td>{{$loop->iteration}}</td>
                                    @if ($row->photo == NULL)
                                    <td><span class="badge rounded-pill bg-danger">Emtpy</span></td>
                                    @else
                                    <td><img class="rounded-circle avatar-xs" src="{{ url('/avatar_society/'.$row->photo) }}"></td>
                                    @endif
                                    <td>{{$row->nik}}</td>
                                    <td>{{$row->username}}</td>
                                    <td>{{$row->email}}</td>
                                    <td>{{$row->phone_number}}</td>
                                    <td>{{$row->address}}</td>
                                    <td>
                                        <a href="{{url('admin/society/edit/'.$row->id)}}" class="btn btn-danger btn-rounded waves-effect waves-light">
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