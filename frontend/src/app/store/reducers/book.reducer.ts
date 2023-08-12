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
  user: {
    id: string;
  };
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
