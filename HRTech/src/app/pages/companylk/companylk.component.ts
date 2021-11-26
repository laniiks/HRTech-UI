import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
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
  company: ICompanyModel;
  evaluations$: Observable<IEvaluationModel>;
  users$: Observable<IUserModel[]>


  constructor(private readonly evaluationService: EvaluationService,
    private readonly companyService: CompanyService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly toastService: ToastService,
    ) { }
  ngOnInit(): void {
    this.loadCompany();
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
}
