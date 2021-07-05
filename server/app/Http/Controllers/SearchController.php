<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class SearchController extends Controller
{
    public function __construct(Request $request)
    {
        $this->limit = $request->query('limit', 15);
        $this->page = $request->query('page', 1);
        $this->search = $request->query('search', "");
    }

    public function getLimit()
    {
        return $this->limit;
    }

    public function getPage()
    {
        return $this->page;
    }

    public function getSearch()
    {
        return $this->search;
    }

    public function getOffset()
    {
        return $this->limit * ($this->page - 1);
    }

    public function searchResponse(Builder $items)
    {


        return response()->json([
            "total" => $items->count(),
            "count" => sizeof($items->limit($this->getLimit())->offset($this->getOffset())->get()),
            "items" => $items->limit($this->getLimit())->offset($this->getOffset())->get(),
        ], 200);
    }
}