import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IGradeModel } from '../models/grade/grade-model';

@Injectable({
  providedIn: 'root'
})
export class GradeService {
  private ROOT_URL = `api/Grade`;
  ttpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8;'
    })
};
  constructor(private http: HttpClient) { }

  getGradeById(id: number){
    return this.http.get<IGradeModel>(`${this.ROOT_URL}/GetByIdGrade/${id}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  getGradeInCompany(companyId: Guid){
    return this.http.get<IGradeModel[]>(`${this.ROOT_URL}/GetAllGradesInCompany/${companyId}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
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
