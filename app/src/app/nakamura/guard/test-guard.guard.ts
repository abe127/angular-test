import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestGuardGuard implements CanDeactivate<unknown> {
  constructor(
    private router: Router
  ){}

  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let str = currentState.url + 'から' + nextState?.url + 'へ移動';
    if(currentState.url == '/nakamura' && nextState?.url == '/kusano'){
      str+='はできません'
      console.log(str)
      this.router.navigate(['/abe']);
      return false;
    }
    console.log(str)
    return true;
  }

}
