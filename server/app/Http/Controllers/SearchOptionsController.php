<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SearchOptionsController extends Controller
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
}