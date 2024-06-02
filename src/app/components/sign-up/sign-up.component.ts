import { Component } from '@angular/core';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { DialogRef } from '@angular/cdk/dialog';
import { tap, catchError, of } from 'rxjs';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  nameFormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [
    Validators.required, 
    Validators.minLength(6), 
    Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{6,}$')
  ]);

  constructor(
    public dialog: DialogRef<string>,
    private authService: AuthService
  ) {}

  signUp(): void {
    if (this.nameFormControl.invalid || 
        this.emailFormControl.invalid || 
        this.passwordFormControl.invalid) {
      return;
    }
    
    this.authService.signUp(
      this.nameFormControl.value ?? '',
      this.emailFormControl.value ?? '',
      this.passwordFormControl.value ?? ''
    ).pipe(
      tap(response => {
        console.log(response);
        this.dialog.close();
      }),
      catchError(error => {
        console.error('Erro ao cadastrar:', error);
        return of(null);
      })
    ).subscribe();
  }
}
