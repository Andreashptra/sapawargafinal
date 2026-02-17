@extends('admin.layouts.main')
@section('title','Laporan Harian')
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
                    <h4 class="mb-sm-0 font-size-18">Laporan Harian</h4>

                    <div class="page-title-right">
                        <ol class="breadcrumb m-0">
                            <li class="breadcrumb-item active">Laporan Harian</li>
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
            <form action="{{url('admin/report/day/search')}}" method="GET" enctype="multipart/form-data">
                <div class="col-12">
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card">
                                <div class="card-body">
                                    <div class="mb-3 row">
                                        <label for="price" class="col-md-2 col-form-label">Dari Tanggal</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="date" id="date1" name="date1" value="">
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="price" class="col-md-2 col-form-label">Sampai Tanggal</label>
                                        <div class="col-md-10">
                                            <input class="form-control" type="date" id="date2" name="date2" value="">
                                        </div>
                                    </div>
                                    <div class="mb-3 row">
                                        <label for="price" class="col-md-2 col-form-label"></label>
                                        <div class="col-md-10">
                                            <button class="btn btn-success" type="submit"> Cari</button> 
                                            <a href="{{url('admin/report/day/cetakpdf/?date1='.Request::get('date1').'&date2='.Request::get('date2'))}}" class="btn btn-warning" target="_blank">Export PDF</a>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                       
                    </div>
                </div>
            </form>
        </div>
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-body">
                        <table id="datatable" class="table table-bordered dt-responsive  nowrap w-100">
                            <thead>
                            <tr>
                                <th>No</th>
                                <th>NIK</th>
                                <th>Pengaduan</th>
                                <th>Tanggal</th>
                                <th>Status</th>
                            </tr>
                            </thead>


                            <tbody>
                                @foreach ($data as $item)
                                    <tr>
                                        <td>{{$loop->iteration}}</td>
                                        <td>{{$item->nik}}</td>
                                        <td>{{$item->contents_of_the_report}}</td>
                                        <td>{{$item->date_complaint}}</td>
                                        @if ($item->status == "0")
                                        <td><span class="badge rounded-pill bg-danger">Belum Diproses</span></td>
                                        @elseif($item->status == 'process')
                                        <td><span class="badge rounded-pill bg-primary">Proses</span></td>
                                        @else 
                                        <td><span class="badge rounded-pill bg-success">Selesai</span></td>
                                        @endif
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
        var paket_id = $(this).attr('paket-id');
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
            window.location = "{{url('admin/transaction/delete')}}/"+paket_id+"";
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
            var outlet = $(this).data('outlet');
            var type = $(this).data('type');
            var paket_name = $(this).data('paket_name');
            var price = $(this).data('price');
            var created = $(this).data('created');
            var updated = $(this).data('updated');
            $('#outlet').text(outlet);
           
            $('#type').text(type);
            $('#paket_name').text(paket_name);
            $('#price').text(price);
            $('#created').text(created);
            $('#updated').text(updated);
        })
    })
</script>
@endpush