import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Observable } from 'rxjs';
import { ICompanyModel } from 'src/app/models/company/company-create-model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  companys$: Observable<ICompanyModel[]>;
  company$: ICompanyModel;
  type: string;


constructor(private readonly companyService: CompanyService,
              private readonly http: HttpClient) { }
  ngOnInit(): void {
    this.companys$ = this.companyService.getAllCompany();
  }

  getCompany(id: Guid){
    this.type = 'GetCompanyId';

    this.companyService.getCompanyById(id).subscribe(data =>{
      this.company$ = data;
    });
  }
}
