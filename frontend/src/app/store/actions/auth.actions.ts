import { createAction, props } from '@ngrx/store';
import { SessionData } from '../reducers/auth.reducer';

enum authActionsType {
  LOGIN = '[Auth] Login',
  SET_LOGIN_DATA = '[Auth] Login Success',
  LOGIN_FAIL = '[Auth] Login Fail',
}

export const loginRequestAction = createAction(
  authActionsType.LOGIN,
  props<{ email: string; password: string }>()
);

export const setLoginDataAction = createAction(
  authActionsType.SET_LOGIN_DATA,
  props<{ session: SessionData | undefined }>()
);

export const loginFailAction = createAction(
  authActionsType.LOGIN_FAIL,
  props<{ message: string }>()
);
