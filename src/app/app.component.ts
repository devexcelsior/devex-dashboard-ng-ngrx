import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { logout, login } from './auth/state/actions/auth.actions';
import { authSelectors } from './auth/state/selectors';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();

  isLoggedIn$: Observable<boolean>;
  isLoggedOut$: Observable<boolean>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    const userProfile = localStorage.getItem('user');
    if (userProfile) {
      this.store.dispatch(login({ user: JSON.parse(userProfile) }));
    }
    this.isLoggedIn$ = this.store.pipe(select(authSelectors.isLoggedIn));
    this.isLoggedOut$ = this.store.pipe(select(authSelectors.isLoggedOut));

    // this.subscriptions.add(authSubscription);
  }

  logOut(): void {
    this.store.dispatch(logout());
  }

  ngOnDestroy(): void {
    // console.log('destroying login component');
    // if (this.subscriptions) {
    //   console.log('this.subscriptions:', this.subscriptions);
    //   this.subscriptions.unsubscribe();
    //   console.log('unsubscribed to array of subscriptions');
    // }
  }
}
