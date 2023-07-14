import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, catchError, map, of, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BookServices } from '../services/book.services';
import {
  bookFailAction,
  bookRequestAction,
  setBookDataAction,
} from '../actions/book.actions';

@Injectable()
export class BookEffects {
  bookRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(bookRequestAction),
        switchMap(
          (action: {
            title: string;
            isbn: string;
            language: string;
            condition: string;
          }) => {
            return this.bookService
              .bookRequest(
                action.title,
                action.isbn,
                action.language,
                action.condition
              )
              .pipe(
                map(() => {
                  this.store.dispatch(
                    setBookDataAction({ message: 'New Message' })
                  );
                  return EMPTY;
                }),
                catchError((err) => {
                  this.snackBar.open('Fill all the inputs', undefined, {
                    duration: 2000,
                  });

                  return of(bookFailAction({ message: err.message }));
                })
              );
          }
        )
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private bookService: BookServices,
    private router: Router,
    private snackBar: MatSnackBar,
    private store: Store
  ) {}
}
