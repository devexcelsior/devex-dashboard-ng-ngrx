import { createAction, props } from '@ngrx/store';
import { User } from '../../model/user.model';

export const login = createAction('[Auth] User Login', props<{ user: User }>());
export const setToken = createAction(
  '[Auth] Set Access Token',
  props<{ accessToken: string }>()
);
export const validateToken = createAction(
  '[Auth] Validate Access Token',
  props<{ accessToken: string }>()
);
export const logout = createAction('[Auth] User Logout');
