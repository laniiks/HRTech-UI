import {Injectable} from '@angular/core';
import {BehaviorSubject, from, Observable} from 'rxjs';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { ForgotPassword, ResetPasswordDto } from '../models/account/forgotpassword.model';
import { environment } from 'src/environments/environment';
@Injectable({providedIn: 'root'})

export class AuthService {
  private readonly tokenName = 'login_session';
  private isAuthSubject$: BehaviorSubject<boolean>;
  isAdmins: boolean;


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json; charset=utf-8;'
    })
  };

  constructor(private http: HttpClient) {
    this.isAuthSubject$ = new BehaviorSubject(false);
  }

  get isAuth() {
    return this.isAuthSubject$.value;
  }

  get isAuth$() {
    if (this.getToken()){
      this.isAuthSubject$.next(true)
    }
    return this.isAuthSubject$.asObservable();
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenName, token);
    this.isAuthSubject$.next(!!this.getToken());
  }

  getToken(): string {
    return localStorage.getItem(this.tokenName);
  }

  deleteToken(): void {
    localStorage.removeItem(this.tokenName);
    this.isAuthSubject$.next(!!this.getToken());
  }

  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      resolve(!!this.getToken());
    });
  }  
  isAdmin(): Observable<boolean>{
    return this.http.get<boolean>(`api/Account/IsAdmin`);
  }
}
