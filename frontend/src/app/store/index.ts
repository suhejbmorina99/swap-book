import * as fromAuth from './reducers/auth.reducer';

export interface State {
  auth: fromAuth.State;
}

export const initialState = {
  auth: fromAuth.initialSessionDataState,
};

export const reducers = {
  auth: fromAuth.reducer,
};
