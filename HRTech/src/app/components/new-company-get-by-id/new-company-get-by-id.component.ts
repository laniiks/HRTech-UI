import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ICompanyModel } from 'src/app/models/company/company-create-model';
import { CompanyService } from 'src/app/services/company.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-new-company-get-by-id',
  templateUrl: './new-company-get-by-id.component.html',
  styleUrls: ['./new-company-get-by-id.component.scss']
})
export class NewCompanyGetByIdComponent implements OnInit {
  @Input() company: ICompanyModel;

  constructor(private readonly companyService: CompanyService,
    private toastService: ToastService,
    private router: Router,
    ) { }

  ngOnInit() {
  }
  ngOnChanges(){

  }
  activeCompany(id: Guid, isRegisterUser: boolean){
    this.companyService.activeCompany(id, isRegisterUser).subscribe(()=>{
      location.reload();
      this.toastService.show('Компания принята', {classname: 'bg-success text-light'});

    })
  }
  rejectCompany(id: Guid){
    this.companyService.rejectCompany(id).subscribe(()=>{
      location.reload();
      this.toastService.show('Компания отклонена', {classname: 'bg-error text-light'});

    })
  }

}
