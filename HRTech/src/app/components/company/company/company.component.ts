import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ICompanyModel } from 'src/app/models/company/company-create-model';
import { IEvaluationModel, IEvaluationModelGetById } from 'src/app/models/evaluation/evaluation-model';
import { CompanyService } from 'src/app/services/company.service';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @Input() company: ICompanyModel;
  evaluations$: IEvaluationModel;
  company$: ICompanyModel;

  constructor(private readonly evaluationService: EvaluationService,
    private readonly companyService: CompanyService) { 
  }

  ngOnInit() {

  }
  ngOnChanges(){
    this.evaluationService.getAllEvaluationInCompany(this.company.id).subscribe(data=>{
      this.evaluations$ = data;
    });
  }
  deleteCompany(id: Guid){
    this.companyService.deleteCompany(id).subscribe(()=>{
      location.reload();
    })
  }

  restoreCompany(id: Guid){
    this.companyService.restoreCompany(id).subscribe(()=>{
      location.reload();
    })  
  }

}
