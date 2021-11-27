import { HttpClient, HttpResponse } from '@angular/common/http';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { IAddressModel } from 'src/app/models/address/address-model';
import { ICreateCompany, ListGrades } from 'src/app/models/company/company-create-model';
import { IFileModel } from 'src/app/models/photo/file-model';
import { CompanyService } from 'src/app/services/company.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {
  public createCompany: FormGroup;
  templateFile: IFileModel;
  public responseLogo: IFileModel;
  public responseExcelFile: IFileModel
  private ROOT_URL_FILE = `api/UploadFile`

  private formObj={
    title: ['', Validators.required],
    country: [''],
    city: [''],
    street: [''],
    houseNumber: [''],
  }
  message: string;
  constructor(
    private companyService: CompanyService,
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private router: Router,
    private renderer: Renderer2,
    private http: HttpClient
  ) { 
    this.loadTemplateFile();
    // this.renderer.setStyle(document.body, 'background-image', 'url("../../../assets/image/b7f4a6ca34e9649e47ffb6b6f5e0d759.jpeg")');
    // this.renderer.setStyle(document.body, 'background-size', 'cover');
    // this.renderer.setStyle(document.body, 'background-attachment', 'fixed');
    // this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
    // this.renderer.setStyle(document.body, 'background-position', 'center center');
  }

  ngOnInit(): void {
    this.createCompany = this.formBuilder.group(
      {
        id: 0,
        title: ['', Validators.required],
        country: ['', Validators.required],
        area: ['', Validators.required],
        city: ['', Validators.required],
        street: ['', Validators.required],
        houseNumber: ['', Validators.required],
        description: [''],
        grades: this.formBuilder.array([])
      }
    )
  }
  loadTemplateFile(){
    this.companyService.getLastTemplateFile().subscribe(templateFile =>
      this.templateFile = templateFile
    );
  }
  downloadTemplateFile(id: number, filename: string){
    return this.http.get(`${this.ROOT_URL_FILE}/DownloadTemplateFile/${id}`, {responseType: 'blob' as 'json'}).subscribe(
      (response: any) =>{
          let dataType = response.type;
          let binaryData = [];
          binaryData.push(response);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          if (filename)
              downloadLink.setAttribute('download', filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();
      }
  )
    // {responseType: 'blob'})
    // .subscribe((data: Blob)=>{
    //   const downloadedFile = new Blob([data]);
    //   const url = URL.createObjectURL(downloadedFile);
    //   window.open(url);
    // });
  }
  
  grades() : FormArray {
    return this.createCompany.get("grades") as FormArray
  }
   
  newGrades(): FormGroup {
    return this.formBuilder.group({
      title: '',
    })
  }
   
  addGrade() {
    this.grades().push(this.newGrades());
  }
   
  removeGrade(i:number) {
    this.grades().removeAt(i);
  }
  get address() {
    const address: IAddressModel = {
      country: this.createCompany.get('country').value,
      city: this.createCompany.get('city').value,
      street: this.createCompany.get('street').value,
      houseNumber: this.createCompany.get('houseNumber').value,
      area: ''
    };
    return address;
  }
  
  get company(){
    const company: ICreateCompany = {
      createdDateTime: new Date(),
      companyName: this.createCompany.get('title').value,
      description: this.createCompany.get('description').value,
      address: this.address,
      image: this.responseLogo,
      excelFileUsers: this.responseExcelFile,
      grades: this.createCompany.get('grades').value
    }
    return company;
  }
  public uploadFinishedLogo = (event) => {
    this.responseLogo = event;
  }
  public uploadFinishedExcelFile = (event) => {
    this.responseExcelFile = event;
  }
  submit(){
    this.companyService.create(this.company)
    .pipe(take(1))
      .subscribe((data) => {
        this.toastService.show('Компания отправлена на рассмотрение', {classname: 'bg-success text-light'});
        this.router.navigate(['/', data]);
      });
  }

}
