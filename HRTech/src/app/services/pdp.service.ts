import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { IPdpModel } from '../models/pdp/pdp-model';

@Injectable({
  providedIn: 'root'
})
export class PdpService {
  private ROOT_URL = `api/PersonalDeveloperPlan`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8;'
    })
  };

  constructor(private readonly http: HttpClient) { }

  getPdpForUser(){
    return this.http.get<IPdpModel[]>(`${this.ROOT_URL}/GetAllPdpForUser`)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    )
  }
  
  downloadPdpFile(fileGuid: Guid, filename: string){
    return this.http.get(`${this.ROOT_URL}/DownloadPersonalDeveloperPlan/${fileGuid}/`, {responseType: 'blob' as 'json'}).subscribe(
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
  }
  
  errorHandler(e) {
    let errorMessage = '';
    if (e.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = e.error.message;
    } else {
        // Get server-side error
        errorMessage = `Error Code: ${e.status}\nMessage: ${e.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
