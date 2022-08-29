import { Action, createReducer, on } from '@ngrx/store';
import { authActions } from '../actions';
import { User } from '../../model/user.model';

export const key = 'auth';

export interface AuthState {
  user: User | undefined;
  isLoggedIn: boolean;
}

export const initialAuthState: AuthState = {
  user: undefined,
  isLoggedIn: false,
};

const authReducerInternal = createReducer(
  initialAuthState,

  on(authActions.loginComplete, (state, { user, isLoggedIn }) => {
    return {
      ...state,
      user,
      isLoggedIn,
    };
  }),
  on(authActions.logout, (state, {}) => {
    return {
      ...state,
      user: undefined,
      isLoggedIn: false,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerInternal(state, action);
}
