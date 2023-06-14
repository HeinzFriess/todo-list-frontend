import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //throw new Error('Method not implemented.');

    const token = localStorage.getItem('token');
    if (token) {
      req = req.clone({ setHeaders: { Authorization: 'token ' + token} });
      // req = req.clone({
      //   headers: req.headers.set('Authorization', 'token ' + token )
      // });
    }

    return next.handle(req).pipe( /*pipe ist eine Funktion die ausgeführt wird sobald der request fertig ist  */
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigateByUrl('/login');
          }
        }
        return throwError(() => err);
      })
    );
  }
}
