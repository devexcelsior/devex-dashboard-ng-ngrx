import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions';
import { User } from '../../model/user.model';

export const key = 'auth';

export interface AuthState {
  user: User | undefined;
  accessToken: string | undefined;
}

export const initialAuthState: AuthState = {
  user: undefined,
  accessToken: undefined,
};

export const reducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(AuthActions.setToken, (state, action) => {
    return {
      ...state,
      accessToken: action.accessToken,
    };
  }),
  on(AuthActions.logout, (state, action) => {
    return {
      ...state,
      user: undefined,
      accessToken: undefined,
    };
  })
);
