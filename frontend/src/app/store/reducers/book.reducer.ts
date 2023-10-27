import { Action, createReducer, on } from '@ngrx/store';
import * as bookAction from '../actions/book.actions';

export interface BookData {
  id: string;
  title: string;
  author: string;
  isbn: string;
  language: string;
  condition: string;
  numberOfPages: number;
  category: string;
  publisher: string;
  user: {
    id: string;
  };
}

export interface UpdateBookData {
  bookId: string;
  title: string;
  author: string;
  isbn: string;
  language: string;
  condition: string;
  numberOfPages: number;
  category: string;
  publisher: string;
}

export interface State {
  bookData: BookData[] | undefined;
}

export const initialBookDataState: State = {
  bookData: undefined,
};

export const reducer = createReducer<State, Action>(
  initialBookDataState,
  on(bookAction.setBookDataAction, (state, { books }) => ({
    ...state,
    bookData: books,
  }))
);
