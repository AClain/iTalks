<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;

use App\Http\Controllers\SearchController;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use App\Models\Status;

class StatusController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {

        $search = new SearchController($request, Status::query());

        $Status = $search->addWhere('name', 'LIKE', '%' . $search->getSearch() . '%');

        return response()->json( $Status->getResults(), 201);
    }

    /**
     * Return the status for the given id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function get($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json([
                'message' => 'Le statut n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'status' => $status,
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:20|unique:statuses,name'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $status = new Status();
        $status->name = trim(request('name'));
        $save = $status->save();

        if ($save) {
            return response()->json([
                'message' => 'Le statut a été créé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|min:3|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $status = Status::find($id);

        if (!$status) {
            return response()->json([
                'message' => 'Le statut n\'a pas été trouvé.',
            ], 404);
        }

        $customExistsName = Status::where('name', request('name'))->first();

        if (request('name') !== $status->name && $customExistsName) {
            return response()->json([
                'errors' => [
                    'name' => 'Ce nom est déjà utilisé.'
                ]
            ], 400);
        }

        $status->name = request('name') ?? $status->name;
        $update = $status->save();

        if ($update) {
            return response()->json([
                'message' => 'Statut mis à jour avec succès!',
                'status' => $status
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        $status = Status::find($id);

        if (!$status) {
            return response()->json([
                'message' => 'Le statut n\'a pas été trouvé.'
            ], 404);
        }

        $statusRelation = Status::doesntHave('badges')
            ->doesntHave('posts')
            ->doesntHave('categories')
            ->doesntHave('comments')
            ->doesntHave('notifications')
            ->doesntHave('post_categories')
            ->doesntHave('post_resources')
            ->doesntHave('post_saved')
            ->doesntHave('resources')
            ->doesntHave('roles')
            ->doesntHave('users')
            ->doesntHave('user_badges')
            ->doesntHave('user_follows')
            ->find($id);

        if ($statusRelation) {
            return response()->json([
                'message' => 'Le status est lié à un ou plusieurs object.'
            ], 404);
        }

        $delete = $status->delete();

        if ($delete) {
            return response()->json([
                'message' => 'Statut supprimé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}
