import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IUserModel} from '../models/account/user.model';
import { catchError, map, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AddPhoneNumber, VerifyPhoneNumber } from '../models/account/phonenumber.model';
import { Guid } from 'guid-typescript';

@Injectable({providedIn: 'root'})
export class UserService implements OnInit{
  private readonly ROOT_URL = 'api/Account';
  private readonly ROOT_USER_URL = `api/User`

  ngOnInit(): void {
  }

  constructor(private readonly http: HttpClient) {
  }

  getUser(){
    return this.http.get<IUserModel>(`${this.ROOT_URL}/info`)
  }
  getAllUsersInCompany(companyId: Guid){
    return this.http.get<IUserModel[]>(`${this.ROOT_USER_URL}/GetAllUserInCompany?companyId=${companyId}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  isDirector(companyId: Guid){
    return this.http.get<boolean>(`${this.ROOT_USER_URL}/IsDirector?companyId=${companyId}`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getUserById(userId: string) {
    return this.http.get<IUserModel>(`${this.ROOT_URL}/${userId}`)
  }

  deleteUser(){
    return this.http.delete(`${this.ROOT_URL}/Delete`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  updateGrade(gradeId: number){
    return this.http.put(`${this.ROOT_URL}/UpdateGrade/${gradeId}`, null).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }
  
  verifyPhone(verifyPhone: VerifyPhoneNumber){
    return this.http.post<AddPhoneNumber>(`${this.ROOT_URL}/VerifyPhoneNumber`, verifyPhone)
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
