import { createAction, props } from '@ngrx/store';
import { BookData } from '../reducers/book.reducer';

enum bookActionsType {
  BOOK = '[Book] Book',
  BOOK_SUCCESS = '[Book] Book Register Success',
  BOOK_FAIL = '[Book] Book Register Fail',
}

export const bookRequestAction = createAction(
  bookActionsType.BOOK,
  props<{
    title: string;
    author: string;
    isbn: string;
    language: string;
    condition: string;
    numberOfPages: number;
    user: { id: string };
  }>()
);

export const setBookDataAction = createAction(
  bookActionsType.BOOK_SUCCESS,
  props<{ books: BookData | undefined }>()
);

export const bookFailAction = createAction(
  bookActionsType.BOOK_FAIL,
  props<{ message: string }>()
);
