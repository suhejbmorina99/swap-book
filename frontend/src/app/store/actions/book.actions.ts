import { createAction, props } from '@ngrx/store';

enum bookActionsType {
  BOOK = '[Book] Book',
  BOOK_SUCCESS = '[Book] Book Register Success',
  BOOK_FAIL = '[Book] Book Register Fail',
}

export const bookRequestAction = createAction(
  bookActionsType.BOOK,
  props<{ title: string; isbn: string; language: string; condition: string }>()
);

export const setBookDataAction = createAction(
  bookActionsType.BOOK_SUCCESS,
  props<{ message: string }>()
);

export const bookFailAction = createAction(
  bookActionsType.BOOK_FAIL,
  props<{ message: string }>()
);
