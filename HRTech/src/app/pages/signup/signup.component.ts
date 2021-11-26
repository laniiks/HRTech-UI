import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BaseService} from '../../services/base.service';
import {Router} from '@angular/router';
import {ApiUrls} from '../../shared/apiURLs';
import {confirmPasswordValidator} from '../../directives/confirm-password-validator.directive';
import {IRegisterModel} from '../../models/account/register.model';
import {ToastService} from '../../services/toast.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  public registerForm: FormGroup;
  private pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[+!@#$%^&*]).{6,20}/g;

  private formObj = {
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6),
                    Validators.maxLength(20), Validators.pattern(this.pattern)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]]
  };

  constructor(private readonly formBuilder: FormBuilder,
              private readonly baseService: BaseService,
              private readonly router: Router,
              private toastService: ToastService) {
    this.registerForm = formBuilder.group(this.formObj, {validators: confirmPasswordValidator});
  }

  ngOnInit(): void {
  }

  get email() {
    return this.registerForm.get('email');
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  public register() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }
    const payload: IRegisterModel = this.registerForm.getRawValue();
    this.baseService.post(ApiUrls.register, payload)
      .then((res) => {
        this.toastService.show(`Пользователь ${res.email} успешно зарегистрирован, перейдите на почту для подтверждения аккаунта.`, {classname: 'bg-success text-light'});
        this.router.navigate(['login']);
      });
  }

}
