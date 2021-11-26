import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IUserModel } from '../models/account/user.model';
import { ICreateEvaluationModel, IEvaluationModel, IEvaluationModelGetById } from '../models/evaluation/evaluation-model';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private ROOT_URL = `api/Evaluation`;
  private readonly ROOT_USER_URL = `api/User`;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8;'
    })
  };
  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json-patch+json;'
    })
  };

  constructor(private http: HttpClient) { }

  getByIdEvaluation(id: Guid){
    return this.http.get<IEvaluationModelGetById>(`${this.ROOT_URL}/GetByIdEvaluation/${id}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  getAllEvaluationForUser(){
    return this.http.get<IEvaluationModel>(`${this.ROOT_URL}/GetAllEvaluationForUser`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  
  getAllEvaluationForExpertUser(){
    return this.http.get<IEvaluationModel>(`${this.ROOT_URL}/GetAllResponseEvaluationForExpertUser`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  getAllEvaluationInCompany(id: Guid){
    return this.http.get<IEvaluationModel>(`${this.ROOT_URL}/GetAllResponseEvaluationInCompany/${id}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }

  getAllExpertUserInCompany(companyId: Guid, expertUserState: number){
    return this.http.get<IUserModel[]>(`${this.ROOT_USER_URL}/GetAllExpertUserInCompany?companyId=${companyId}&expertUserState=${expertUserState}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  create(evaluation: ICreateEvaluationModel): Observable<ICreateEvaluationModel>{
    return this.http.post<ICreateEvaluationModel>(`${this.ROOT_URL}/CreateEvaluation`, evaluation, this.httpOptions1)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  successEvaluationSoftSkill(evaluationId: Guid, skillSuccess: number){
    return this.http.put(`${this.ROOT_URL}/SuccessEvaluationSoftSkill?evaluationId=${evaluationId}&skillSuccess=${skillSuccess}`, null)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  successEvaluationHardSkill(evaluationId: Guid, skillSuccess: number){
    return this.http.put(`${this.ROOT_URL}/SuccessEvaluationHardSkill?evaluationId=${evaluationId}&skillSuccess=${skillSuccess}`, null)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  successEvaluationEnglishSkill(evaluationId: Guid, skillSuccess: number){
    return this.http.put(`${this.ROOT_URL}/SuccessEvaluationEnglishSkill?evaluationId=${evaluationId}&skillSuccess=${skillSuccess}`, null)
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
