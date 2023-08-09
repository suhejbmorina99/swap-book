import { createSelector } from '@ngrx/store';
import * as bookReducer from '../reducers/book.reducer';
import { State } from '../index';

export const getBookData = (state: State) => state.book;

export const getBooksData = createSelector(
  getBookData,
  (bookData: bookReducer.State) => (bookData ? bookData.bookData : undefined)
);
