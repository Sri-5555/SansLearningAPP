import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const idToken = this.authService.getIdToken();
    if (idToken) {
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Authorization': `Bearer ${idToken}`
        })
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
