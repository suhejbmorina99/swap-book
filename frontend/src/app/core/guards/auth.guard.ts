import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { AuthServices } from '../../store/services/auth.services';
import { setLoginDataAction } from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private service: AuthServices,
    private router: Router,
    private store: Store
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('jwt');
    if (token === null) {
      return this.router.navigate(['login']);
    } else {
      return this.service.sessionToken().pipe(
        map((response) => {
          this.store.dispatch(setLoginDataAction({ session: response }));
          return true;
        }),
        catchError((e) => {
          this.store.dispatch(setLoginDataAction({ session: undefined }));
          localStorage.removeItem('jwt');
          return this.router.navigate(['login']);
        })
      );
    }
  }
}
