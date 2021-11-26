import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import {HTTPCodeEnum} from '../shared/enums/e-http-responce';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly router: Router,) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error) => {
          if (error.status === HTTPCodeEnum.Unauthorized) {
            this.router.navigate(['/', 'login']);
          }
          return throwError(error);
        })
      );
  }
}
