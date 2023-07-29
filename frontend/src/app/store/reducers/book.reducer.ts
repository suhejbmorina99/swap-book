import { Action, createReducer, on } from '@ngrx/store';
import * as bookAction from '../actions/book.actions';

export interface BookData {
  accountActivated: boolean;
  email: string;
  emailConfirmed: boolean;
  lastname: string;
  name: string;
  role: string;
  userId: string;
}

export interface State {
  bookData: BookData | undefined;
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
