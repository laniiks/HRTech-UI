import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { IUserModel } from 'src/app/models/account/user.model';
import { ICreateEvaluationModel } from 'src/app/models/evaluation/evaluation-model';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-evaluation',
  templateUrl: './create-evaluation.component.html',
  styleUrls: ['./create-evaluation.component.scss']
})
export class CreateEvaluationComponent implements OnInit {
  form: FormGroup;
  userHardSkills$: Observable<IUserModel[]>;
  userSoftSkills$: Observable<IUserModel[]>;
  userEnglishSkills$: Observable<IUserModel[]>;
  user: IUserModel;

  constructor(
    private formBuilder: FormBuilder,
    private readonly userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private evaluationService: EvaluationService
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        englishSkillsId: ['', [Validators.required]],
        softSkillsId: ['', [Validators.required]],
        hardSkillsId: ['', [Validators.required]],
        dateOfEvaluation: ['', [Validators.required]]
      }
    );
    this.userService.getUser().subscribe(users=>{
      this.user = users;
      this.userSoftSkills$ = this.evaluationService.getAllExpertUserInCompany(this.user.companyId, 10);
      this.userHardSkills$ = this.evaluationService.getAllExpertUserInCompany(this.user.companyId, 20);
      this.userEnglishSkills$ = this.evaluationService.getAllExpertUserInCompany(this.user.companyId, 30);
    })
  }
  get evaluation(){
    const evaluation: ICreateEvaluationModel = {
      applicationUserIdExpertSoftSkills: this.form.get('softSkillsId').value,
      applicationUserIdExpertHardSkills: this.form.get('hardSkillsId').value,
      applicationUserIdExpertEnglishSkills: this.form.get('englishSkillsId').value,
      dateOfEvaluation: this.form.get('dateOfEvaluation').value
    }
    return evaluation;
  }

  submit(){
    this.evaluationService.create(this.evaluation)
    .pipe(take(1))
    .subscribe((data) => {
      this.toastService.show('Оценка успешно добавлена', {classname: 'bg-success text-light'});
      this.router.navigate(['/lk']);
    });
  }
}
