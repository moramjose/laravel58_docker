import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthorsComponent } from './components/authors/authors.component';
import { BooksComponent } from './components/books/books.component';
import { authGuard } from './guards/auth.guard';
import { guestGuard } from './guards/guest.guard';

const routes: Routes = [
  // rutas publicas
  { 
    path: 'login', 
    component: LoginComponent, 
    canActivate: [guestGuard]
  },
  { 
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [guestGuard]
  },
  
  // rutas privadas
  { 
    path: 'authors', 
    component: AuthorsComponent, 
    canActivate: [authGuard] 
  },
  { 
    path: 'books', 
    component: BooksComponent, 
    canActivate: [authGuard] 
  },
  
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }