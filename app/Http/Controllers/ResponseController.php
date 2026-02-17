<?php

namespace App\Http\Controllers;

use App\Models\Complaint;
use App\Models\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Date;

class ResponseController extends Controller
{
    public function show($id)
    {
        $data['item'] = Complaint::with(['Society', 'Response'])->findOrFail($id);
        return view('admin.complaints.edit', $data);
    }

    public function save(Request $request, $id)
    {
        $complaint = Complaint::findOrFail($id);
        $complaint->status = $request->status;
        $complaint->save();
        $response = Response::where('complaint_id', $id)->first();
        $complaint_id = $response->id;
        $responses = $response->findOrFail($complaint_id);
        $responses->response_date = Date::now()->format('Y-m-d');
        $responses->user_id = Auth::user()->id;
        $responses->response = $request->response;
        $responses->save();
        return redirect()->route('complaints.index')->with(['success' => 'Response has been updated']);
    }
}
