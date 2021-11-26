import { Component, OnInit, Renderer2 } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseService} from '../../services/base.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {ILoginModel} from '../../models/account/login.model';
import {ApiUrls} from '../../shared/apiURLs';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  private formObj = {
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.min(8)]],
    rememberMe: [false]
  };

  constructor(private readonly baseService: BaseService,
              private readonly router: Router,
              private readonly auth: AuthService,
              private readonly formBuilder: FormBuilder,
              private renderer: Renderer2,
              private readonly toastService: ToastService) {
    this.loginForm = formBuilder.group(this.formObj)
    this.renderer.setStyle(document.body, 'background-image', 'url("../../../assets/image/07fe8de6af89b7b6361a53d85d16f6ca.png")');
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-attachment', 'fixed');
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(document.body, 'background-position', 'center center');
  }

  ngOnInit(): void {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get rememberMe() {
    return this.loginForm.get('rememberMe');
  }

  public async login() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    const payload: ILoginModel = this.loginForm.getRawValue();
    await this.baseService.post(ApiUrls.login, payload, {responseType: 'text'})
      .then(res => {
          this.auth.saveToken(res);
          this.router.navigate(['/lk']);
      })
      .catch(() => {
        this.toastService.show(`Введены неверные данные. Попробуйте снова`, {classname: 'bg-danger text-light'})
      });
  }
}
