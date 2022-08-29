import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
// import { logout, login } from './auth/state/actions/auth.actions';
import { authSelectors } from './auth/state/selectors';
import { AppState } from './state/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      // this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }
    // this.isLoggedIn$ = this.store.pipe(select(authSelectors.isLoggedIn));
    // this.isLoggedOut$ = this.store.pipe(select(authSelectors.isLoggedOut));
  }

  logOut(): void {
    // this.store.dispatch(logout());
  }

  ngOnDestroy(): void {}
}
