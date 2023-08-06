import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map } from 'rxjs';
import { Store } from '@ngrx/store';
import { setBookDataAction } from 'src/app/store/actions/book.actions';
import { BookServices } from 'src/app/store/services/book.services';

@Injectable({
  providedIn: 'root',
})
export class BookGuard implements CanActivate {
  constructor(
    private service: BookServices,
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
    const userId = localStorage.getItem('userId');

    if (userId === null) {
      return this.router.navigate(['login']);
    } else {
      return this.service.getUserBooks({ id: userId }).pipe(
        map((books) => {
          this.store.dispatch(setBookDataAction({ books }));
          return true;
        })
      );
    }
  }
}
