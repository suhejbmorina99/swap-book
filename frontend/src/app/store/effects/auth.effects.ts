import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import { AuthServices } from '../services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  loginFailAction,
  loginRequestAction,
  setLoginDataAction,
} from '../actions/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  loginRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginRequestAction),
        switchMap((action: { email: string; password: string }) => {
          return this.authService
            .loginRequest(action.email, action.password)
            .pipe(
              map((session) => {
                localStorage.setItem('jwt', session.sessionToken);
                this.store.dispatch(setLoginDataAction({ session }));
                this.router.navigate(['dashboard']);
                return EMPTY;
              }),
              catchError((err) => {
                this.snackBar.open(
                  'User login or password do not match',
                  undefined,
                  { duration: 2000 }
                );

                return of(loginFailAction({ message: err.message }));
              })
            );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthServices,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}
}
