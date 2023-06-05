import { Action, createReducer, on } from '@ngrx/store';
import * as authAction from '../actions/auth.actions';

export interface SessionData {
  token: string;
  userData: UserData;
}

export interface UserData {
  accountActivated: boolean;
  email: string;
  emailConfirmed: boolean;
  lastname: string;
  name: string;
  role: string;
  userId: string;
}

export interface State {
  sessionData: SessionData | undefined;
}

export const initialSessionDataState: State = {
  sessionData: undefined,
};

export const reducer = createReducer<State, Action>(
  initialSessionDataState,
  on(authAction.setLoginDataAction, (state, { session }) => ({
    ...state,
    sessionData: session,
  }))
);
