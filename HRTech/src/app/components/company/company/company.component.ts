import { Component, Input, OnInit } from '@angular/core';
import { ICompanyModel } from 'src/app/models/company/company-create-model';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {
  @Input() company: ICompanyModel;

  constructor() { }

  ngOnInit(): void {
  }

}
