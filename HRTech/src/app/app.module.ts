import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {environment} from '../environments/environment';
import {ApiInterceptor} from './interceptors/api-url.interceptor';
import {ToastsContainerComponent} from './components/toast-container/toast-container.component';
import {AuthService} from './services/auth.service';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {AuthHeadersInterceptor} from './interceptors/headers.interceptor';
import {AuthGuard} from './guards/auth.guard';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UploadComponent } from './upload/upload.component';
import { HrtechComponent } from './pages/hrtech/hrtech.component';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { CreateEvaluationComponent } from './pages/create-evaluation/create-evaluation.component';
import { EvaluationComponent } from './pages/evaluation/evaluation.component';
import { CompanylkComponent } from './pages/companylk/companylk.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { CompanyComponent } from './components/company/company/company.component';
import { NewCompanyComponent } from './components/new-company/new-company.component';
import { NewCompanyGetByIdComponent } from './components/new-company-get-by-id/new-company-get-by-id.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        ToastsContainerComponent,
        UserDashboardComponent,
        UploadComponent,
        HrtechComponent,
        CreateCompanyComponent,
        CreateEvaluationComponent,
        EvaluationComponent,
        CompanylkComponent,
        AdminPanelComponent,
        CompanyComponent,
        NewCompanyComponent,
        NewCompanyGetByIdComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHeadersInterceptor,
      multi: true
    },
    {
      provide: 'BASE_API_URL',
      useValue: environment.baseApiUrl
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
