import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ 
    ReactiveFormsModule, 
    FormsModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatCardModule, 
    MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  
  constructor(
    public dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}
  
  openDialog(){
    this.dialog.open(SignUpComponent);
  }

  login(): void {
    if (this.emailFormControl.invalid || this.passwordFormControl.invalid) {
      return;
    }

    this.authService.login(
      this.emailFormControl.value ?? '',
      this.passwordFormControl.value ?? ''
    ).pipe(
      tap(response => {
        console.log("successfull login");
        if (response && response.access_token) {
          this.authService.saveToken('accessToken', response.access_token, response.expires_in);
          this.authService.saveToken('refreshToken', response.refresh_token, response.refresh_expires_in);
        }
        this.router.navigate(['/home']);

      }),
      catchError(error => {
        console.error('Erro ao fazer login:', error);
        return of(null);
      })
    ).subscribe();
  }
}


