import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guards/auth.guard';
import { AuthGuard } from './guards/login.guard';

export const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
   { path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
   { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
   { path: '**', redirectTo: '/home' }
];
