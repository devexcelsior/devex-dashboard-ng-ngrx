import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
// import { login, setToken } from '../state/actions/auth.actions';
import { Router } from '@angular/router';
import { AuthState } from '../state/reducers';
import { AuthService } from '../auth.service';
import { tap } from 'rxjs/operators';

@UntilDestroy()
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

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

    this.auth
      .login(val.email, val.password)
      .pipe(
        untilDestroyed(this),
        tap((res) => {
          // this.store.dispatch(login({ user: res.user }));
          // this.store.dispatch(setToken({ accessToken: res.accessToken }));
        })
      )
      .subscribe({
        next: (n) => this.router.navigateByUrl('/vendors'),
        error: (e) => console.log('handle error:', e.error),
      });
  }
}
