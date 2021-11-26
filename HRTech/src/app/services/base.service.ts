import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BaseService {

  constructor(private readonly http: HttpClient) { }

  public post(apiURL: string, payload: any = {}, options?): Promise<any> {
    return this.http.post(apiURL, payload, options).pipe(
      retry(1),
      catchError(this.errorHandler)
    ).toPromise();
  }

  public get(apiURL: string): Promise<any> {
    return this.http.get(apiURL).pipe(
      retry(1),
      catchError(this.errorHandler)
    ).toPromise();
  }

  errorHandler(e) {
    let errorMessage = '';
    if (e.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = e.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
