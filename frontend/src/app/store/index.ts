import * as fromAuth from './reducers/auth.reducer';
import * as fromBook from './reducers/book.reducer';

export interface State {
  auth: fromAuth.State;
  book: fromBook.State;
}

export const initialState = {
  auth: fromAuth.initialSessionDataState,
  book: fromBook.initialBookDataState,
};

export const reducers = {
  auth: fromAuth.reducer,
  book: fromBook.reducer,
};
