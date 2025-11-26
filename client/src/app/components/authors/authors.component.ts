import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  authors: any[] = [];
  newAuthorName = '';

  constructor(private authorService: AuthorService) { }

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorService.getAuthors().subscribe({
      next: (data) => this.authors = data,
      error: (err) => console.error('Error cargando autores', err)
    });
  }

  createAuthor() {
    if (!this.newAuthorName.trim()) return;

    this.authorService.createAuthor(this.newAuthorName).subscribe({
      next: () => {
        alert('Autor creado!');
        this.newAuthorName = '';
        this.loadAuthors(); // Recargar lista
      },
      error: (err) => alert('Error creando autor')
    });
  }

  // ... (dentro de la clase AuthorsComponent)

  exportData() {
    this.authorService.downloadExcel().subscribe({
      next: (blob: Blob) => {
        // 1. Crear una URL temporal para el archivo recibido
        const url = window.URL.createObjectURL(blob);
        
        // 2. Crear un elemento <a> invisible
        const a = document.createElement('a');
        a.href = url;
        a.download = 'reporte_biblioteca.xlsx'; // Nombre del archivo
        
        // 3. Simular clic y limpiar
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        alert('Error al descargar el reporte');
      }
    });
  }
}