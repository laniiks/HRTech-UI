import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { ICommentModel } from '../models/comment/comment-model';
import { ICompanyModel, ICreateCompany } from '../models/company/company-create-model';
import { IFileModel } from '../models/photo/file-model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private ROOT_URL = `api/Company`;
  private ROOT_URL_FILE = `api/UploadFile`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8;'
    })
  };

  constructor(private http: HttpClient) { }

  create(company: ICreateCompany): Observable<ICreateCompany>{
    return this.http.post<ICreateCompany>(`${this.ROOT_URL}`, company, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  getCompanyById(companyId: Guid){
    return this.http.get<ICompanyModel>(`${this.ROOT_URL}/${companyId}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  getAllCompany(){
    return this.http.get<ICompanyModel[]>(`${this.ROOT_URL}/All`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  getLastTemplateFile(){
    return this.http.get<IFileModel>(`${this.ROOT_URL_FILE}/GetLastTemplateFile`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getNewCompanys(isNew: boolean){
    return this.http.get<ICompanyModel[]>(`${this.ROOT_URL}/GetNewOrActiveCompany?isNewCompany=${isNew}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  activeCompany(id: Guid, isRegisterUser: boolean){
    return this.http.put(`${this.ROOT_URL}/ActiveCompany?id=${id}&isRegisterUser=${isRegisterUser}`, null, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  rejectCompany(id: Guid){
    return this.http.delete(`${this.ROOT_URL}/RejectCompany/${id}`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  
  downloadTemplateFile(id: number) 
  {
    return this.http.get(`${this.ROOT_URL_FILE}/DownloadTemplateFile/${id}`, {})
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  deleteCompany(id: Guid){
    return this.http.delete(`${this.ROOT_URL}/${id}`, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  restoreCompany(id: Guid){
    return this.http.put(`${this.ROOT_URL}/RestoreCompany?id=${id}`, null, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  
  getCountNewCompany(){
    return this.http.get<number>(`${this.ROOT_URL}/GetCountNewCompany`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
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
