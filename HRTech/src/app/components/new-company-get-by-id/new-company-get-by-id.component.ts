import { Component, Input, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ICompanyModel } from 'src/app/models/company/company-create-model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-new-company-get-by-id',
  templateUrl: './new-company-get-by-id.component.html',
  styleUrls: ['./new-company-get-by-id.component.scss']
})
export class NewCompanyGetByIdComponent implements OnInit {
  @Input() company: ICompanyModel;

  constructor(private readonly companyService: CompanyService) { }

  ngOnInit(): void {
  }
  ngOnChanges(){

  }
  activeCompany(id: Guid, isRegisterUser: boolean){
    this.companyService.activeCompany(id, isRegisterUser).subscribe(()=>{
    })
  }
  rejectCompany(id: Guid){
    this.companyService.rejectCompany(id).subscribe(()=>{
    })
  }

}
