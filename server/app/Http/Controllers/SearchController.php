<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

use function PHPUnit\Framework\directoryExists;

class SearchController extends Controller
{
    public function __construct(Request $request, Builder $query)
    {
        $this->limit = $request->query('limit', 15);
        $this->page = $request->query('page', 1);
        $this->search = $request->query('search', "");
        $this->query = $query;
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

    public function addWhere(
        $column,
        $operator = null,
        $value = null
    ) {
        return $this->query->where($column, $operator, $value);
    }

    public function orderBy($column, $direction = 'asc')
    {
        return $this->query->orderBy($column, $direction);
    }

    public function getResults()
    {
        return [
            "total" => $this->query->count(),
            "count" => sizeof($this->query->limit($this->getLimit())->offset($this->getOffset())->get()),
            "items" => $this->query->limit($this->getLimit())->offset($this->getOffset())->get(),
        ];
    }
}