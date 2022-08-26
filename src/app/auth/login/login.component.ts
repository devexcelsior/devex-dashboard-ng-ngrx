import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { login } from '../state/actions/auth.actions';

import { Router } from '@angular/router';
import { AuthState } from '../state/reducers';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AuthState>,
    private auth: AuthService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {}

  createForm() {}

  invalidForm() {
    console.log('handle invalid form submissions');
  }

  login() {
    if (!this.form.valid) {
      this.invalidForm();
      return;
    }

    const val = this.form.value;

    const connect = this.auth.login(val.email, val.password).pipe(
      tap((user) => {
        this.store.dispatch(login({ user: user }));
        this.router.navigateByUrl('/vendors');
      })
    );

    const subscription = connect.subscribe({
      next: (event) => {
        console.log('next:', event);
      },
      error: (error) => {
        console.log('error', error);
      },
      complete: () => {
        console.log('complete!');
      },
    });

    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    console.log('destroying login component');
    if (this.subscriptions) {
      console.log('this.subscriptions:', this.subscriptions);
      this.subscriptions.unsubscribe();
      console.log('unsubscribed to array of subscriptions');
    }
  }
}
