import { createSelector } from '@ngrx/store';
import * as authReducer from '../reducers/auth.reducer';
import { State } from '../index';

export const getSessionData = (state: State) => state.auth;

export const getUserData = createSelector(
  getSessionData,
  (sessionData: authReducer.State) =>
    sessionData ? sessionData.sessionData : undefined
);
