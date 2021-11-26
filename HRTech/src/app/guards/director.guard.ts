import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IUserModel } from '../models/account/user.model';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class DirectorGuard implements CanActivate {

  user: IUserModel;
  isDirector: Observable<boolean>;
  constructor(private userService: UserService,
    private router: Router){
    this.userService.getUser().subscribe(data => {
      this.user = data;
      this.isDirector = this.userService.isDirector(this.user.companyId);
    })
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
      if(this.isDirector){
        return true;
      }

      this.router.navigate(['/lk'], { queryParams: { returnUrl: state.url } });    
      return false;
    }
  
}
