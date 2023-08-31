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
  updateBookAction,
  updateBookFailAction,
  updateBookSuccessAction,
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
            author: string;
            isbn: string;
            language: string;
            condition: string;
            numberOfPages: number;
            user: {
              id: string;
            };
          }) => {
            return this.bookService
              .bookRequest(
                action.title,
                action.author,
                action.isbn,
                action.language,
                action.condition,
                action.numberOfPages,
                action.user
              )
              .pipe(
                map((books) => {
                  this.store.dispatch(setBookDataAction({ books }));
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

  bookUpdate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateBookAction),
        switchMap(
          (action: {
            bookId?: string;
            title?: string;
            author?: string;
            isbn?: string;
            language?: string;
            condition?: string;
            numberOfPages?: number;
          }) => {
            return this.bookService
              .updateUserBook(
                action.bookId,
                action.title,
                action.author,
                action.isbn,
                action.language,
                action.condition,
                action.numberOfPages
              )
              .pipe(
                map((updateBook) => {
                  if (
                    updateBook.updatedBook.title === action.title &&
                    updateBook.updatedBook.author === action.author &&
                    updateBook.updatedBook.isbn === action.isbn &&
                    updateBook.updatedBook.numberOfPages ===
                      action.numberOfPages
                  ) {
                    this.snackBar.open('Nothing is updated', undefined, {
                      duration: 1000,
                    });

                    return EMPTY;
                  } else {
                    this.store.dispatch(
                      updateBookSuccessAction({ updateBook })
                    );
                    this.snackBar.open('The book its updated', undefined, {
                      duration: 700,
                    });
                    setTimeout(() => {
                      this.router.navigate(['main']);
                    }, 750);
                    return EMPTY;
                  }
                }),
                catchError((err) => {
                  return of(updateBookFailAction({ message: err.message }));
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
