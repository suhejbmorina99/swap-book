import { createAction, props } from '@ngrx/store';
import { BookData, UpdateBookData } from '../reducers/book.reducer';

enum bookActionsType {
  BOOK = '[Book] Book',
  BOOK_SUCCESS = '[Book] Book Register Success',
  BOOK_FAIL = '[Book] Book Register Fail',
  UPDATE_BOOK = '[Book] Update Book',
  UPDATE_BOOK_SUCCESS = '[Book] Update Book Success',
  UPDATE_BOOK_FAIL = '[Book] Update Book Fail',
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
    category: string;
    publisher: string;
    user: { id: string };
  }>()
);

export const setBookDataAction = createAction(
  bookActionsType.BOOK_SUCCESS,
  props<{ books: BookData[] | undefined }>()
);

export const bookFailAction = createAction(
  bookActionsType.BOOK_FAIL,
  props<{ message: string }>()
);

export const updateBookAction = createAction(
  bookActionsType.UPDATE_BOOK,
  props<{
    bookId?: string;
    title?: string;
    author?: string;
    isbn?: string;
    language?: string;
    condition?: string;
    numberOfPages?: number;
    category?: string;
    publisher?: string;
  }>()
);

export const updateBookSuccessAction = createAction(
  bookActionsType.UPDATE_BOOK_SUCCESS,
  props<{ updateBook: UpdateBookData }>()
);

export const updateBookFailAction = createAction(
  bookActionsType.UPDATE_BOOK_FAIL,
  props<{ message: string }>()
);
