<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\AuthorsBooksExport;

class ExportController extends Controller
{
    public function export()
    {
        return Excel::download(new AuthorsBooksExport, 'reporte_autores.xlsx');
    }
}
