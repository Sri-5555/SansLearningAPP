import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(public navCtrl: NavController) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            let error = '';
            let errorStatus = err.status;
            switch (errorStatus) { 
                case 401:
                    if (request.url.includes('login')) {
                        error = 'Invalid Username or Password';
                    } else  if(request.url.includes('password/forgot')){
                        error = 'Pin Generation Failed. Please try again after some time.'
                    } else {
                        this.navCtrl.navigateRoot(['/login']);
                    }
                break;
                default:
                    if (err.statusText === 'Unknown Error') {
                    }
                    error = err.error.error_description;
                    break;
            };

            return throwError(error);
        }))
    }
}