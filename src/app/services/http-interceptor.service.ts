import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to add the new header.
    const clonedRequest = req.clone({ headers: req.headers.set('Access-Control-Allow-Origin', '*') });

    // Pass the cloned request instead of the original request to the next handle
    return next.handle(clonedRequest);
  }
}