<?php

namespace App\Http\Controllers\Admin;

use App\Models\Status;
use Illuminate\Http\Request;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $status = Status::all();

        return \response()->json([
            'status' => $status,
        ], 201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:20'
        ]);

        if ($validator->fails()) {
            return \response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $status = new Status();
        $status->name = \trim(\request('name'));
        $save = $status->save();

        if ($save) {
            return \response()->json([
                'message' => 'Status successfully created!'
            ], 201);
        } else {
            return \response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }
//
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|max:20'
        ]);

        if ($validator->fails()) {
            return \response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $status = Status::find($request->id);

        $customExistsName = Status::where('name', \request('name'))->first();

        if (\request('name') !== $status->name && $customExistsName) {
            return \response()->json([
                'errors' => [
                    'name' => 'La valeur du champ status est déjà utilisée.'
                ]
            ], 400);
        }

        $status->name = \request('name') ? \request('name') : $status->name;
        $update = $status->save();

        if ($update) {
            $status->name = Status::find($status->id);

            unset($status->id);

            return \response()->json([
                'message' => 'Status mis à jour avec succès!',
                'status' => $status->name
            ], 201);
        } else {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $status = Status::where('id', $id)->first();

        $delete = $status->delete();

        if ($delete) {
            return \response()->json([
                'message' => 'Status supprimé avec succès!'
            ], 201);
        } else {
            return \response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }

    }
}
