import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import {Observable} from 'rxjs';
import { take } from 'rxjs/operators';
import { IUserModel } from 'src/app/models/account/user.model';
import { IEvaluationModel } from 'src/app/models/evaluation/evaluation-model';
import { IGradeModel, IGradeModelId } from 'src/app/models/grade/grade-model';
import { IPdpModel } from 'src/app/models/pdp/pdp-model';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { GradeService } from 'src/app/services/grade.service';
import { PdpService } from 'src/app/services/pdp.service';
import { ToastService } from 'src/app/services/toast.service';
import {AuthService} from '../../services/auth.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  form: FormGroup;

  isAuth$ = this.authService.isAuth$;
  currentUser$ = this.userService.getUser();

  user: IUserModel;
  adminData: string;
  private ROOT_URL = `api/PersonalDeveloperPlan`;
  private ROOT_USER_URL = `api/User`;


  grade: IGradeModel;
  pdp$: Observable<IPdpModel[]>;
  grade$: Observable<IGradeModel>;
  grades$: Observable<IGradeModel[]>;
  evaluationsForUser$: Observable<IEvaluationModel>;
  evaluationForExpertUser$: Observable<IEvaluationModel>;
  isAdmin: Observable<boolean>;


  constructor(private readonly pdpService: PdpService,
              private readonly gradeService: GradeService,
              private readonly authService: AuthService,
              private readonly evaluationService: EvaluationService,
              private renderer: Renderer2,
              private readonly userService: UserService,
              private formBuilder: FormBuilder,
              private readonly http: HttpClient) { 
                this.renderer.setStyle(document.body, 'background-color', '#fff');
              }

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        gradeId: ['', [Validators.required]]
      }
    )
    this.pdp$ = this.pdpService.getPdpForUser();
    this.evaluationsForUser$ = this.evaluationService.getAllEvaluationForUser();
    this.evaluationForExpertUser$ = this.evaluationService.getAllEvaluationForExpertUser();
    this.userService.getUser().subscribe(users=>{
      this.user = users;
      this.grade$ = this.gradeService.getGradeById(this.user.gradeId);
      this.grades$ = this.gradeService.getGradeInCompany(this.user.companyId);
    })
    this.isAdmin = this.authService.isAdmin();
    this.renderer.setStyle(document.body, 'background-color', '#fff');
  }
  
  getGrade(id: number){
    this.grade$ = this.gradeService.getGradeById(id);
  }

  downloadPdpFile(fileGuid: Guid, fileName: string){
    this.pdpService.downloadPdpFile(fileGuid, fileName);
  }
  uploadPdpFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post(`${this.ROOT_URL}/AddPdpForUser`, formData, {reportProgress: true, observe: 'events'}).subscribe(
      event => {if (event.type === HttpEventType.Response) {
        location.reload();
      }
    }
    );
  }
  uploadPhotoUser = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('photo', fileToUpload, fileToUpload.name);

    this.http.post(`${this.ROOT_USER_URL}/AddPhotoUser`, formData, {reportProgress: true, observe: 'events'}).subscribe(
        () => location.reload()
    );
  }
  getGradeform(){
    const gradeId: IGradeModelId = {
      id: this.form.get('gradeId').value,
    }
    return gradeId;
  }
  selectGrade(){
    this.userService.updateGrade(this.form.get('gradeId').value).pipe(take(1)).subscribe()
    location.reload()
  }

}
