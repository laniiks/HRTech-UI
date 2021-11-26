import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import {UserDashboardComponent} from './pages/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { HrtechComponent } from './pages/hrtech/hrtech.component';
import { CreateCompanyComponent } from './pages/create-company/create-company.component';
import { CreateEvaluationComponent } from './pages/create-evaluation/create-evaluation.component';
import { EvaluationComponent } from './pages/evaluation/evaluation.component';
import { CompanylkComponent } from './pages/companylk/companylk.component';
import { DirectorGuard } from './guards/director.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';


const routes: Routes = [
  {
    path: '',
    component: HrtechComponent,
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'createEvaluation',
    component: CreateEvaluationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'evaluation/:id',
    component: EvaluationComponent
  },
  {
    path: 'lk',
    component: UserDashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'CompanyLk/:id',
    component: CompanylkComponent,
    canActivate: [DirectorGuard]
  },
  {
    path: 'create-company', 
    component: CreateCompanyComponent,
  },
  {
    path: 'admin-panel',
    component: AdminPanelComponent,
    canActivate: [AdminGuard]
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, DirectorGuard, AdminGuard]
})
export class AppRoutingModule { }
