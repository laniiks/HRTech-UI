import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ICompanyModel } from 'src/app/models/company/company-create-model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss']
})
export class NewCompanyComponent implements OnInit {

  newCompanys$: Observable<ICompanyModel[]>;
  company$: ICompanyModel;

  constructor(private readonly companyService: CompanyService) { }

  ngOnInit(): void {
    this.newCompanys$ = this.companyService.getNewCompanys(true);
  }
  getCompany(id: Guid){
    this.companyService.getCompanyById(id).subscribe(data =>{
      this.company$ = data;
    });
  }
}
