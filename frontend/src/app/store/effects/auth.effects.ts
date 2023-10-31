import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import { AuthServices } from '../services/auth.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  loginFailAction,
  loginRequestAction,
  setLoginDataAction,
  registerRequestAction,
  setRegisterData,
  registerFailAction,
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
                localStorage.setItem('jwt', session.token);
                localStorage.setItem('userId', session.user);
                localStorage.setItem('userName', session.userName);
                this.store.dispatch(setLoginDataAction({ session }));
                this.router.navigate(['main']);
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

  registerRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(registerRequestAction),
        switchMap(
          (action: {
            name: string;
            email: string;
            password: string;
            phone: string;
            country: string;
            city: string;
          }) => {
            return this.authService
              .registerRequest(
                action.name,
                action.email,
                action.password,
                action.phone,
                action.country,
                action.city
              )
              .pipe(
                map((session) => {
                  this.store.dispatch(setRegisterData({ session }));
                  this.router.navigate(['login']);
                  return EMPTY;
                }),
                catchError((err) => {
                  this.snackBar.open('Fill the information', undefined, {
                    duration: 2000,
                  });

                  return of(loginFailAction({ message: err.message }));
                })
              );
          }
        )
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
