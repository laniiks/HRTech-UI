import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck, take } from 'rxjs/operators';
import { IRegisterModel } from 'src/app/models/account/register.model';
import { IUserModel } from 'src/app/models/account/user.model';
import { ICompanyModel } from 'src/app/models/company/company-create-model';
import { IEvaluationModel } from 'src/app/models/evaluation/evaluation-model';
import { CompanyService } from 'src/app/services/company.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-companylk',
  templateUrl: './companylk.component.html',
  styleUrls: ['./companylk.component.scss']
})
export class CompanylkComponent implements OnInit {
  public createUser: FormGroup;
  company: ICompanyModel;
  evaluations$: Observable<IEvaluationModel>;
  users$: Observable<IUserModel[]>


  constructor(private readonly evaluationService: EvaluationService,
    private readonly companyService: CompanyService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly toastService: ToastService,
    ) { }
  ngOnInit(): void {
    this.loadCompany();

    this.createUser = this.formBuilder.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      patronymic: ['', Validators.required],
      email: ['', Validators.required],
      isDirector: [''],
      phoneNumber: [''],
    })
  }

  loadCompany(){
    this.activatedRoute.params.pipe(pluck('id')).subscribe(companyId => {
      this.companyService.getCompanyById(companyId).subscribe(company => {
        this.company = company;
        this.evaluations$ = this.evaluationService.getAllEvaluationInCompany(companyId);
        this.users$ = this.userService.getAllUsersInCompany(companyId);
      })
    })
  }
  get user(){
    const user: IRegisterModel = {
      email: this.createUser.get('email').value,
      firstName: this.createUser.get('firstName').value,
      lastName: this.createUser.get('lastName').value,
      patronymic: this.createUser.get('patronymic').value,
      phoneNumber: this.createUser.get('phoneNumber').value,
      companyId: this.company.id,
      isDirector: this.createUser.get('isDirector').value
    }
    return user;
  }
  addUserInCompany(){
    this.userService.addUserInCompany(this.user)
    .pipe(take(1))
      .subscribe((data) => {
        this.toastService.show('Пользователь успешно создан', {classname: 'bg-success text-light'});
        this.router.navigate(['/', data]);
      });
  }
}
