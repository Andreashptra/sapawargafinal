<?php

namespace App\Http\Controllers;

use App\Models\Society;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use File;

class SocietyController extends Controller
{
    public function index()
    {
        $data['society'] = Society::all();
        return view('admin.society.index', $data);
    }

    public function create()
    {
        return view('admin.society.add');
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'nik' => 'required|min:2|max:20',
            'username' => 'required|min:2|max:20',
            'email' => 'required|min:2',
            'name' => 'required|min:2|max:20',
            'password' => 'required|min:5|max:20',
            'phone_number' => 'required',
            'address' => 'required',
            'photo' => 'required',
        ]);
        $society = new Society;
        $society->nik = $request->nik;
        $society->username = $request->username;
        $society->email = $request->email;
        $society->name = $request->name;
        $society->phone_number = $request->phone_number;
        $society->address = $request->address;
        $society->password = Hash::make($request->password);
        $photo = $request->file('photo');
        $tujuan_upload = 'avatar_society';
        $photo_name = time() . "_" . $photo->getClientOriginalName();
        $photo->move($tujuan_upload, $photo_name);
        $society->photo = $photo_name;
        $society->save();
        if ($request->submit == "more") {
            return redirect()->route('society.create')->with(['success' => 'User has been saved !']);
        } else {
            return redirect()->route('society.index')->with(['success' => 'User has been saved']);
        };
    }
    public function destroy($id)
    {
        $society = Society::findOrFail($id);
        $society->delete();
        return redirect()->back()->with(['success' => 'Society has been deleted']);
    }

    public function edit($id)
    {
        $data['society'] = Society::findOrFail($id);
        return view('admin.society.edit', $data);
    }

    public function update(Request $request, $id)
    {
        $this->validate($request, [
            'nik' => 'required|min:2|max:20',
            'username' => 'required|min:2',
            'email' => 'required|min:2|max:20',
            'name' => 'required|min:2|max:20',
            'phone_number' => 'required',
            'address' => 'required',
        ]);
        $society = Society::findOrFail($id);
        $society->nik = $request->nik;
        $society->username = $request->username;
        $society->email = $request->email;
        $society->name = $request->name;
        $society->phone_number = $request->phone_number;
        $society->address = $request->address;
        if ($request->get('password') != '') {
            $society->password = Hash::make($request->password);
        }
        if ($request->file('photo') != '') {
            File::delete('avatar_society/' . $society->photo);
            $photo = $request->file('photo');
            $tujuan_upload = 'avatar_society';
            $photo_name = time() . "_" . $photo->getClientOriginalName();
            $photo->move($tujuan_upload, $photo_name);
            $society->photo = $photo_name;
        }
        $result = $society->save();
        if ($result) {
            return redirect()->route('society.index')->with(['success' => 'Society has been updated']);
        } else {
            return redirect()->back();
        }
    }
}
