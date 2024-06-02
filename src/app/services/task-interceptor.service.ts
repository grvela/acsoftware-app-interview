import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

@Injectable()
export class TaskInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.includes('task')) {

      const authToken = inject(AuthService).getAccessToken();

      const newReq = req.clone({
        headers: req.headers.append('Authorization', 'Bearer ' + authToken)
      });

      return next.handle(newReq);
    }

    return next.handle(req);
  }
}
