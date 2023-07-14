import { createAction, props } from '@ngrx/store';
import { SessionData } from '../reducers/auth.reducer';

enum authActionsType {
  LOGIN = '[Auth] Login',
  SET_LOGIN_DATA = '[Auth] Login Success',
  LOGIN_FAIL = '[Auth] Login Fail',
  REGISTER = '[Auth] Register',
  SET_REGISTER_DATA = '[Auth] Register Success',
  REGISTER_FAIL = '[Auth] Register Fail',
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

export const registerRequestAction = createAction(
  authActionsType.REGISTER,
  props<{
    name: string;
    email: string;
    password: string;
    phone: string;
    country: string;
    city: string;
  }>()
);

export const setRegisterData = createAction(
  authActionsType.SET_REGISTER_DATA,
  props<{ session: SessionData | undefined }>()
);

export const registerFailAction = createAction(
  authActionsType.REGISTER_FAIL,
  props<{ message: string }>()
);
