import { createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions';
import { User } from '../../model/user.model';

export const key = 'auth';

export interface AuthState {
  user: User | undefined;
  accessToken: string | undefined;
  tokenValid: boolean;
}

export const initialAuthState: AuthState = {
  user: undefined,
  accessToken: undefined,
  tokenValid: false,
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
  on(AuthActions.validateToken, (state, action) => {
    // const accessToken = action.accessToken;
    // const decoded = jwtDecode<JwtPayload>(token);
    // if (!decoded) {
    //   console.log('token cannot be decoded');
    //   this.router.navigateByUrl('/login');
    //   return of(false);
    // }

    // console.log('token_decoded:', decoded);

    // let now = new Date().getTime();
    // now = (now - (now % 1000)) / 1000;

    // if (decoded && decoded.exp) {
    //   if (now < decoded.exp) {
    //     // Token has not expired
    //   }
    // }

    return {
      ...state,
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
