<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use App\Author;

class AuthorsBooksExport implements FromCollection, WithHeadings
{
    public function headings(): array
    {
        return ['Nombre Autor', 'Cantidad Libros', 'Títulos'];
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Author::with('books')->get()->map(function($author) {
            return [
                'Nombre Autor' => $author->name,
                'Cantidad Libros' => $author->books_count,
                'Títulos' => $author->books->pluck('title')->implode(', ')
            ];
        });
    }
}
