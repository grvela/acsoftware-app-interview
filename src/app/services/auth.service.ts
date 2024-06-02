import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  signUp(name: string , email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/user`, { name, email, password });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  saveToken(key: string, value: string, expiresIn: number): void {
    localStorage.setItem(key, value);
    setTimeout(() => {
      localStorage.removeItem(key);
    }, expiresIn * 1000);
  }

  getToken(key: string): string | null {
    return localStorage.getItem(key);
  }

  getAccessToken(): string | null {
    return this.getToken('accessToken');
  }

  getRefreshToken(): string | null {
    return this.getToken('refreshToken');
  }
}