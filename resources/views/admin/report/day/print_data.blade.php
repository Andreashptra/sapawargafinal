<!DOCTYPE html>
<html>
<head>
    <title>Print Day</title>
</head>
<body>
     <center>
<table style="text-align: center;">
    <tr>
        <td><img src=""></td>
        
        <td><img src=""></td>
    </tr>
</table>
</center>
<br>
<table class="table table-hover table-striped table-bordered text-center" cellspacing="0" width="100%" border="1">
                <thead>
                    <tr class="success"><th colspan="6" style="text-align: center"></th></tr>

                    <tr class="success"><td colspan="6" style="font-family: sans-serif;text-align: center;">

                        <div style="text-align: center;">
                            <h3>Laporan Harian </h3>
                            <h3>OPCS</h3>
                        </div>
                    </td></tr>

                    <tr class="success"><th colspan="6" style="text-align: center"></th></tr>
                    <tr>
                        <th>No</th>
                        <th>NIK</th>
                        <th>Pengaduan</th>
                        <th>Tanggal</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody style="text-align: center;">
                    @foreach($data as $item)
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

</center>
</body>
</html>
<script>
    window.print();
</script>