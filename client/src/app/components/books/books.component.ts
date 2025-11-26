import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  authors: any[] = [];
  bookTitle = '';
  selectedAuthorId = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService
  ) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe({
      next: (data) => this.authors = data,
      error: (err) => console.error('Error cargando autores', err)
    });
  }

  createBook() {
    if (!this.bookTitle || !this.selectedAuthorId) {
      alert('Completa todos los campos');
      return;
    }

    const newBook = {
      title: this.bookTitle,
      author_id: this.selectedAuthorId
    };

    this.bookService.createBook(newBook).subscribe({
      next: () => {
        alert('Libro creado! Verifica en Autores si subió el contador.');
        this.bookTitle = '';
      },
      error: (err) => alert('Error al crear libro')
    });
  }
}