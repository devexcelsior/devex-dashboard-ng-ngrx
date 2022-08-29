import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppState } from '../state/reducers';
import { select, Store } from '@ngrx/store';
import { authSelectors } from './state/selectors';
import { tap } from 'rxjs/operators';
import jwtDecode, { JwtPayload } from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      console.log('no access token in local storage');
      this.router.navigateByUrl('/login');
      return of(false);
    }

    const decoded = jwtDecode<JwtPayload>(token);
    if (!decoded) {
      console.log('token cannot be decoded');
      this.router.navigateByUrl('/login');
      return of(false);
    }

    console.log('token_decoded:', decoded);

    let now = new Date().getTime();
    now = (now - (now % 1000)) / 1000;

    if (decoded && decoded.exp) {
      if (now < decoded.exp) {
        // Token has not expired
      }
    }

    return of(true);
    // return this.store.pipe(
    //   select(authSelectors.isLoggedIn),
    //   tap((loggedIn) => {
    //     if (!loggedIn) {
    //       this.router.navigateByUrl('/login');
    //     }
    //   })
    // );
  }
}
